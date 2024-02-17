// check this out https://www.youtube.com/watch?v=nsMzWA6_3RA

"use client";
import { Button } from "@/components/ui/button";
import { Form } from "./_component/form";
import { properGetUserById } from "@/lib/actions/proper.action";

// export default async function Page() {
//   return (
//     <div className="flex-center h-screen w-full bg-primary-50">
//       <Form />
//     </div>
//   );
// }
export default function Page() {
  async function handleClick() {
    const result = await properGetUserById("dwd");
  }

  return (
    <div className="flex-center h-screen w-full bg-primary-50">
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
}
