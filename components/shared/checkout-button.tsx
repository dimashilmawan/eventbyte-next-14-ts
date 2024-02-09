"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { PopulatedEvent } from "@/lib/actions/event.action";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.action";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export const CheckoutButton = ({ event }: { event: PopulatedEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const isEventCreator = userId?.toString() === event.organizer._id.toString();

  const handleCheckoutPriced = async () => {
    try {
      await checkoutOrder({
        eventId: event._id,
        buyerId: userId,
        eventTitle: event.title,
        eventDesc: event.description!,
        eventPrice: event.price!,
        eventIsFree: event.isFree,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckoutFree = async () => {};

  return (
    <>
      {!isEventCreator && (
        <>
          <SignedIn>
            {event.isFree ? (
              <Button
                className="rounded-full"
                size="lg"
                onClick={handleCheckoutFree}
              >
                Get Ticket
              </Button>
            ) : (
              <Button
                className="rounded-full"
                size="lg"
                onClick={handleCheckoutPriced}
              >
                Buy Ticket
              </Button>
            )}
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Checkout</Link>
            </Button>
          </SignedOut>
        </>
      )}
    </>
  );
};
