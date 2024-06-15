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

export const CheckoutButton = ({
  event,
  hasOrdered,
}: {
  event: PopulatedEvent;
  hasOrdered: boolean;
}) => {
  const router = useRouter();

  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const isEventCreator = userId?.toString() === event.organizer._id.toString();

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
      <SignedIn>
        {isEventCreator ? (
          <Button asChild className="w-full lg:w-fit">
            <Link href="/profile#organized-events" prefetch>
              Organized events
            </Link>
          </Button>
        ) : hasOrdered ? (
          <p className="w-fit bg-primary-500 px-4 py-1 font-semibold text-white">
            Ticket Already Bought
          </p>
        ) : (
          <Button
            className="w-full lg:w-fit"
            size="lg"
            onClick={handleCheckoutPriced}
          >
            {event.isFree ? "Get Ticket" : "Buy Ticket"}
          </Button>
        )}
      </SignedIn>
      <SignedOut>
        <Button asChild className="w-full  lg:w-fit" size="lg">
          <Link href="/sign-in" prefetch>
            Checkout
          </Link>
        </Button>
      </SignedOut>
    </>
  );
};
