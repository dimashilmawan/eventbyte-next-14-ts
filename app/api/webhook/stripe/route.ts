import { createOrder } from "@/lib/actions/order.action";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature") as string;
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.log("ERROR NOT ALLOW");
    if (err instanceof Error) {
      return new Response(`Stripe Webhook error: ${err.message}`, {
        status: 400,
      });
    } else {
      return new Response(`Stripe Webhook error`, {
        status: 400,
      });
    }
  }

  // Handle Event
  if (event.type === "checkout.session.completed") {
    const { id, metadata, amount_total } = event.data.object;
    const buyerId = metadata?.buyerId || "";
    const eventId = metadata?.eventId || "";
    const totalAmount = amount_total ? amount_total / 100 : 0;

    try {
      await createOrder({
        stripeId: id,
        buyerId,
        eventId,
        totalAmount,
      });
    } catch (error) {
      return new Response("Something went wrong - STRIPE WEBHOOK", {
        status: 500,
      });
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response(null, { status: 200 });
}
