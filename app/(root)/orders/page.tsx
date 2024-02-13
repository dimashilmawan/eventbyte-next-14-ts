import { Container } from "@/components/shared/container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEventById } from "@/lib/actions/event.action";
import { getOrdersByEvent } from "@/lib/actions/order.action";
import { Types } from "mongoose";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { eventId?: string; query?: string };
}) {
  const eventId = searchParams.eventId || "";
  const query = searchParams.query || "";

  if (!Types.ObjectId.isValid(eventId)) return notFound();

  const event = await getEventById(eventId);

  if (!event) return notFound();

  const orders = await getOrdersByEvent({ eventId, query });

  return (
    <section>
      <Container>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </section>
  );
}
