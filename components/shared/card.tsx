import { PopulatedEvent } from "@/lib/actions/event.action";
import {
  ArrowUpRightFromSquare,
  CalendarIcon,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { boolean } from "zod";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { auth } from "@clerk/nextjs";
import { DeleteConfirmation } from "./delete-confirmation";

type CardProps = {
  event: PopulatedEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

export const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const isEventCreator = event.organizer._id?.toString() === userId?.toString();

  return (
    <li className="relative aspect-[9/10] overflow-hidden rounded-md shadow-md">
      {isEventCreator && hasOrderLink && !hidePrice && (
        <div className="absolute right-3 top-3 z-50 flex flex-col gap-1.5 rounded-md bg-white p-1.5 text-muted-foreground">
          <Button asChild className="h-6 w-6 p-0" variant="ghost">
            <Link href={`/events/${event._id}/update`} className="">
              <SquarePenIcon className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <div className="flex h-full flex-col">
        <Link
          href={`/events/${event._id}`}
          className="relative block aspect-video overflow-hidden"
        >
          <Image
            alt="event card image"
            src={event.imageUrl}
            fill
            sizes="95vw"
            className="rounded-tl-md rounded-tr-md object-cover object-center transition-all hover:scale-110"
          />
        </Link>
        <div className="flex flex-1 flex-col p-4">
          <div className="space-x-2">
            {!hidePrice && (
              <span className="inline-block rounded-md bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-600">
                {event.isFree ? "Free" : `$${event.price}`}
              </span>
            )}
            <span className="inline-block rounded-md bg-gray-500/10 px-4 py-1.5 text-sm font-semibold text-gray-600">
              {event?.category?.name}
            </span>
          </div>
          <p className="mt-2 font-medium text-gray-500">
            {format(event.startDateTime, "EEE, MMM d, h:mm a")}
          </p>
          <Link href={`/events/${event._id}`}>
            <h1 className="mt-4 text-xl font-bold decoration-primary-500 decoration-2  hover:text-primary-500 hover:underline">
              {event.title}
            </h1>
          </Link>
          <div className="mt-2 flex flex-1 items-end ">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-medium text-gray-600">
                {event.organizer.firstName} {event.organizer.lastName}
              </p>
              {/* TODO - HYDRATION FAIL, edit Li LINK wrap to h1 */}
              {hasOrderLink && (
                <Button asChild variant="link">
                  <Link
                    href={`/orders?eventId=${event._id}`}
                    className="flex items-center gap-2"
                  >
                    <span>Order details</span>
                    <ArrowUpRightFromSquare className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
