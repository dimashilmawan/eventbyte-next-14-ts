import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function Post(req: Request) {
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
    const checkoutSession = event.data.object;
    try {
    } catch (error) {}
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response(null, { status: 200 });
}
