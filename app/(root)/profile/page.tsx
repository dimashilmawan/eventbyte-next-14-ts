import { Collection } from "@/components/shared/collection";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Page() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const organizedEvents = await getEventsByUser({ userId });
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
        {/* <Container>
          <Collection />
        </Container> */}
      </section>
      <section>
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
            limit={3}
            page={1}
            emptyTitle="No events have been created yet"
            emptySubtitle="Go create some event now"
            totalPages={organizedEvents.totalPages}
            collectionType="events-organized"
          />
        </Container>
      </section>
    </>
  );
}
