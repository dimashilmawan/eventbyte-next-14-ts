import { Collection } from "@/components/shared/collection";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { getEventById, getEventsByCategory } from "@/lib/actions/event.action";
import { getUserById } from "@/lib/actions/user.action";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, MinusIcon } from "lucide-react";
import { Types } from "mongoose";
import Image from "next/image";
import { notFound } from "next/navigation";

type ImageCoverProps = {
  imageUrl: string;
  device: "mobile" | "desktop";
};

const ImageCover = ({ imageUrl, device }: ImageCoverProps) => {
  return (
    <div
      className={cn(
        "relative aspect-[16/12] md:aspect-auto",
        device === "mobile" && "block md:hidden",
        device === "desktop" && "hidden md:block",
      )}
    >
      <Image
        src={imageUrl}
        alt="Image Hero"
        fill
        sizes="90vw"
        className="object-cover object-center"
        priority
      />
    </div>
  );
};

export default async function Page({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    page?: string;
  };
}) {
  // check if the params id in url is valid object id
  if (!Types.ObjectId.isValid(id)) return notFound();

  const event = await getEventById(id);

  if (!event) return notFound();

  const relatedEvents = await getEventsByCategory({
    eventId: id,
    categoryId: event.category._id,
  });

  const page = Number(searchParams.page) || 1;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <ImageCover imageUrl={event.imageUrl} device="mobile" />
        <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ImageCover imageUrl={event.imageUrl} device="desktop" />

          <div className="space-y-6 py-10 md:px-6">
            <h1 className="text-2xl font-bold">{event.title}</h1>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="space-x-2">
                <span className="inline-block rounded-full bg-green-500/10 px-4 py-1.5 font-semibold text-green-600">
                  {event.isFree ? "Free" : `$${event.price}`}
                </span>
                <span className="inline-block rounded-full bg-gray-500/10 px-4 py-1.5 font-semibold text-gray-600">
                  {event?.category?.name}
                </span>
              </div>

              <p>
                By{" "}
                <span className="font-semibold capitalize text-primary-500">
                  {event?.organizer?.firstName} {event?.organizer?.lastName}
                </span>
              </p>
            </div>

            <Button className="rounded-full" size={"lg"}>
              Buy Ticket
            </Button>

            <div className="space-y-3 ">
              <div className="flex items-center gap-3">
                <div>
                  <CalendarIcon className="h-5 w-5 text-orange-500" />
                </div>
                <p className="leading-none">
                  {format(event.startDateTime, "EEE, MMM d, yyyy / h:mm a")} -{" "}
                  {format(event.endDateTime, "h:mm a")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <MapPinIcon className="h-5 w-5 text-orange-500" />
                </div>
                <p className="leading-none">{event.location}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-600">
                What you&apos;ll learn
              </h3>
              <p>{event.description}</p>

              <p className="truncate text-primary-500 underline">{event.url}</p>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container className="space-y-4 py-10">
          <h2 className="text-2xl font-bold">Related Event</h2>
          <Collection
            data={relatedEvents.data}
            emptyTitle="No Related Events Found"
            emptySubtitle="Come back later!"
            collectionType="all-events"
            limit={3}
            page={page}
            totalPages={relatedEvents.totalPages}
          />
        </Container>
      </section>
    </>
  );
}
