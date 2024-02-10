// "use client";
// import { Button } from "@/components/ui/button";
// import { createEvent, getEventById } from "@/lib/actions/event.action";

import { connectToDB } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Event from "@/lib/database/models/event.model";
import Order from "@/lib/database/models/order.model";

// import { DUMMY_EVENT_DATA } from "@/constants";
// import { notFound } from "next/navigation";

// function Page() {
//   const handleInjectToDB = async () => {
//     const injectEventsPromise = DUMMY_EVENT_DATA.map((event) => {
//       return createEvent({ event, path: "/test" });
//     });
//     await Promise.all(injectEventsPromise);
//     console.log("Success");
//   };
//   return (
//     <div className="flex-center h-screen w-full">
//       <Button onClick={handleInjectToDB}>Inject</Button>
//     </div>
//   );
// }
// export default Page;

export default async function Page() {
  await connectToDB();
  return <div>Page</div>;
}
