import { Container } from "@/components/shared/container";
import { EventForm } from "@/components/shared/event-form";
import { auth } from "@clerk/nextjs";

export default async function Page() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <Container className="!max-w-xl py-4 md:py-6">
          <h3 className="text-center text-2xl font-bold md:text-left">
            Create Event
          </h3>
        </Container>
      </section>
      <Container className="!max-w-xl pb-8 pt-4 md:pb-16 md:pt-6">
        <EventForm type="create" userId={userId} />
      </Container>
    </>
  );
}
