import { Collection } from "@/components/shared/collection";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.action";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    ordersPage: string;
    eventsPage: string;
  };
}) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams.ordersPage) || 1;
  const eventsPage = Number(searchParams.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order) => order.event) || [];

  const organizedEvents = await getEventsByUser({
    userId,
    page: eventsPage,
    limit: 3,
  });
  return (
    <>
      <section>
        <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
          <Container className="flex-between py-8 md:py-10">
            <h3 className="text-3xl font-bold">My Tickets</h3>
            <Button asChild size={"lg"}>
              <Link href="/#events">Explore more events</Link>
            </Button>
          </Container>
        </div>
        <Container className="py-8 md:py-10">
          <Collection
            data={orderedEvents}
            page={ordersPage}
            emptyTitle="No event tickets purchased yet"
            emptySubtitle="No worries - plenty of exciting events to explore!"
            totalPages={orders.totalPages}
            collectionType="my-tickets"
            urlParamsName="ordersPage"
          />
        </Container>
      </section>
      <section id="organized-events">
        <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
          <Container className="flex-between py-8 md:py-10">
            <h3 className="text-3xl font-bold">Organized Events</h3>
            <Button asChild size={"lg"}>
              <Link href="/events/create">Create Event</Link>
            </Button>
          </Container>
        </div>
        <Container className="py-8 md:py-10">
          <Collection
            data={organizedEvents.data}
            page={eventsPage}
            emptyTitle="No events have been created yet"
            emptySubtitle="Go create some event now"
            totalPages={organizedEvents.totalPages}
            collectionType="events-organized"
            urlParamsName="eventsPage"
          />
        </Container>
      </section>
    </>
  );
}
