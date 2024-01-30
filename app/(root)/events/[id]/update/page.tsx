import { EventForm } from "@/components/shared/event-form";
import { auth } from "@clerk/nextjs";

export default function Page() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <div className="wrapper py-4 md:py-6">
          <h3 className="text-center text-2xl font-bold md:text-left">
            Create Event
          </h3>
        </div>
      </section>
      <div className="wrapper pb-6 pt-4 md:pb-10 md:pt-6">
        <EventForm type="update" userId={userId} />
      </div>
    </>
  );
}
