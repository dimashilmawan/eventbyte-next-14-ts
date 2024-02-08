import { Container } from "@/components/shared/container";
import { EventForm } from "@/components/shared/event-form";
import { getEventById } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";
import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  // check if the params id in url is valid object id
  if (!Types.ObjectId.isValid(id)) return notFound();

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  if (!event) return notFound();

  if (event.organizer._id?.toString() !== userId?.toString())
    return redirect("/");

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <Container className=" py-4 md:max-w-xl md:py-6">
          <h3 className="text-center text-2xl font-bold md:text-left">
            Update Event
          </h3>
        </Container>
      </section>
      <Container className="!max-w-xl pb-8 pt-4 md:max-w-xl md:pb-16 md:pt-6">
        <EventForm type="update" userId={userId} event={event} />
      </Container>
    </>
  );
}
