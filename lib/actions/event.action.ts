"use server";

import Event, { IEvent } from "../database/models/event.model";
import { getUserById } from "./user.action";

type CreateEventParams = {
  event: Omit<IEvent, "organizer" | "category" | "createdAt"> & {
    organizer: string;
    category: string;
    createdAt?: Date;
  };
  path: string;
};

export const createEvent = async ({ event, path }: CreateEventParams) => {
  try {
    const user = await getUserById(event.organizer);
    if (!user) throw new Error(`User with ID ${event.organizer} not found`);

    const newEvent = await Event.create(event);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {}
};
