"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../utils";

type CheckoutOrderParams = {
  eventId: string;
  buyerId: string;
  eventPrice: number;
  eventIsFree: boolean;
  eventTitle: string;
  eventDesc: string;
};

export const checkoutOrder = async ({
  eventId,
  buyerId,
  eventPrice,
  eventIsFree,
  eventTitle,
  eventDesc,
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
            product_data: { name: eventTitle, description: eventDesc },
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

    redirect(session.url!);
  } catch (error) {
    handleError(error);
    throw error;
  }
};