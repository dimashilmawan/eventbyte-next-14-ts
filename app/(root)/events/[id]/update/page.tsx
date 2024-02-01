import { Container } from "@/components/shared/container";
import { EventForm } from "@/components/shared/event-form";
import { auth } from "@clerk/nextjs";

export default function Page() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <Container className=" py-4 md:max-w-xl md:py-6">
          <h3 className="text-center text-2xl font-bold md:text-left">
            Create Event
          </h3>
        </Container>
      </section>
      <Container className=" pb-8 pt-4 md:max-w-xl md:pb-16 md:pt-6">
        <EventForm type="update" userId={userId} />
      </Container>
    </>
  );
}
