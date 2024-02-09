"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { PopulatedEvent } from "@/lib/actions/event.action";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.action";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export const CheckoutButton = ({ event }: { event: PopulatedEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const isEventCreator = userId?.toString() === event.organizer._id.toString();
  const router = useRouter();

  const handleCheckoutPriced = async () => {
    try {
      const checkoutUrl = await checkoutOrder({
        eventId: event._id,
        buyerId: userId,
        eventTitle: event.title,
        eventDesc: event.description!,
        eventPrice: event.price!,
        eventIsFree: event.isFree,
        eventImageUrl: event.imageUrl,
      });
      if (!checkoutUrl) throw new Error("Checkout Failed");
      router.replace(checkoutUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isEventCreator && (
        <>
          <SignedIn>
            <Button
              className="rounded-full"
              size="lg"
              onClick={handleCheckoutPriced}
            >
              {event.isFree ? "Get Ticket" : "Buy Ticket"}
            </Button>
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
