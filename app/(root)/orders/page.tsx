import { Container } from "@/components/shared/container";
import { Search } from "@/components/shared/search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  isEventExist,
  verifyEventCreatedByUser,
} from "@/lib/actions/event.action";
import { getOrdersByEvent } from "@/lib/actions/order.action";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { eventId?: string; query?: string };
}) {
  const eventId = searchParams.eventId || "";
  const query = searchParams.query || "";

  // check if eventId params is valid objectId
  if (!Types.ObjectId.isValid(eventId)) return notFound();

  // check if event is exist
  const event = await isEventExist(eventId);
  if (!event) return notFound();

  // retrieve userId from clerk session
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // Verify that the Event is Created by User
  const isVerify = await verifyEventCreatedByUser({ eventId, userId });
  if (!isVerify) return redirect("/profile");

  const orders = await getOrdersByEvent({ eventId, query });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <Container className="py-4 md:py-6">
          <h3 className="text-center text-2xl font-bold text-[#00244c] md:text-left">
            Event Order management
          </h3>
        </Container>
      </section>
      <section>
        <Container className="pb-8 pt-4 md:pb-16 md:pt-6">
          {orders.length > 0 && (
            <Search placeholder="Search order by buyer name ..." />
          )}

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Event Title</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders && orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center font-medium">
                    No Orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => {
                  return (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.eventTitle}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>
                        {format(order.createdAt, "EEE, MMM d, yyyy")}
                      </TableCell>
                      <TableCell>{order.totalAmount}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Container>
      </section>
    </>
  );
}
