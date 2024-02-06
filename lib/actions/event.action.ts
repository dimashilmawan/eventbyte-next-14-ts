"use server";

import { revalidatePath } from "next/cache";
import Event, { IEvent } from "../database/models/event.model";
import { getUserById } from "./user.action";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import User, { IUser } from "../database/models/user.model";
import Category, { ICategory } from "../database/models/category.model";
import { notFound } from "next/navigation";

type PopulatedEvent = Omit<IEvent, "category" | "organizer"> & {
  category: ICategory;
  organizer: Pick<IUser, "_id" | "firstName" | "lastName">;
};

type CreateEventParams = {
  event: Omit<IEvent, "_id">;
  path: string;
};

const populateEvent = (query: any) => {
  return query
    .populate({ path: "category", select: ["_id", "name"], model: Category })
    .populate({
      path: "organizer",
      select: ["_id", "firstName", "lastName"],
      model: User,
    });
};

export const createEvent = async ({
  event,
  path,
}: CreateEventParams): Promise<IEvent> => {
  try {
    await connectToDB();

    const user = await getUserById(event.organizer);
    if (!user) throw new Error(`User with ID ${event.organizer} not found`);

    const newEvent = await Event.create(event);
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getEventById = async (
  eventId: string,
): Promise<PopulatedEvent> => {
  try {
    await connectToDB();

    const event = await populateEvent(Event.findById(eventId));
    // const event = await Event.findById(eventId);
    if (!event) return notFound();

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
    throw error;
  }
};
