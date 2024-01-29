import { EventForm } from "@/components/shared/event-form";
import { auth } from "@clerk/nextjs";

export default function Page() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <div className="wrapper py-6 md:py-10">
          <h3 className="text-center text-2xl font-bold md:text-left">
            Create Event
          </h3>
        </div>
      </section>
      <div className="wrapper py-3 md:py-6">
        <EventForm type="create" userId={userId} />
      </div>
    </>
  );
}
