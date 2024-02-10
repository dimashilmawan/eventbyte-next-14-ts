"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import Order, { IOrder } from "../database/models/order.model";
import Event, { IEvent } from "../database/models/event.model";
import User, { IUser } from "../database/models/user.model";
import Category, { ICategory } from "../database/models/category.model";

type CheckoutOrderParams = {
  eventId: string;
  buyerId: string;
  eventPrice: number;
  eventIsFree: boolean;
  eventTitle: string;
  eventDesc: string;
  eventImageUrl: string;
};

type CreateOrderParams = {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: number;
};

type GetOrdersByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

type PopulatedOrder = Omit<IOrder, "event"> & {
  event: Omit<IEvent, "organizer" | "category"> & {
    organizer: Pick<IUser, "_id" | "firstName" | "lastName">;
    category: ICategory;
  };
};

export const checkoutOrder = async ({
  eventId,
  buyerId,
  eventPrice,
  eventIsFree,
  eventTitle,
  eventDesc,
  eventImageUrl,
}: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = eventIsFree ? 0 : eventPrice * 100;

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: eventTitle,
              description: eventDesc,
              images: [eventImageUrl],
            },
          },

          quantity: 1,
        },
      ],

      metadata: {
        buyerId,
        eventId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL!}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL!}/events/${eventId}`,
    });

    return session.url;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDB();
    const newOrder = await Order.create({
      stripeId: order.stripeId,
      totalAmount: order.totalAmount,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const hasUserOrderedForEvent = async ({
  eventId,
  userId,
}: {
  eventId: string;
  userId: string;
}): Promise<boolean> => {
  try {
    await connectToDB();
    const hasOrdered = await Order.findOne({
      event: eventId,
      buyer: userId,
    });

    return JSON.parse(JSON.stringify(!!hasOrdered));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getOrdersByUser = async ({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams): Promise<{
  data: PopulatedOrder[];
  totalPages: number;
}> => {
  try {
    await connectToDB();

    const condition = {
      buyer: userId,
    };

    const skipAmout = (Number(page) - 1) * limit;

    const orders = await Order.find(condition)
      .sort({ createdAt: "desc" })
      .skip(skipAmout)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: [
          {
            path: "organizer",
            model: User,
            select: ["_id", "firstName", "lastName"],
          },
          {
            path: "category",
            model: Category,
            select: ["_id", "name"],
          },
        ],
      });

    const ordersCount = await Order.countDocuments();

    return JSON.parse(
      JSON.stringify({
        data: orders,
        totalPages: Math.ceil(ordersCount / limit),
      }),
    );
  } catch (error) {
    handleError(error);
    throw Error;
  }
};
