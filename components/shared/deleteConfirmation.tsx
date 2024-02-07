"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { deleteEvent } from "@/lib/actions/event.action";
import { usePathname } from "next/navigation";

export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleDeleteEvent = async () => {
    setIsLoading(true);
    await deleteEvent({ path: pathname, eventId });
    setIsOpen(false);
    setIsLoading(false);
  };
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(openState) => setIsOpen(openState)}
    >
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 p-0">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this event?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            disabled={isLoading}
            onClick={handleDeleteEvent}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
