import { getEventById } from "@/lib/actions/event.action";
import { notFound } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  try {
    const event = await getEventById(id);
    if (!event) return notFound();
  } catch (error) {
    return notFound();
  }
  return <div>Page</div>;
}
