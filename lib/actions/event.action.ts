"use server";

import { revalidatePath } from "next/cache";
import Event, { IEvent } from "../database/models/event.model";
import { getUserById } from "./user.action";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import User, { IUser } from "../database/models/user.model";
import Category, { ICategory } from "../database/models/category.model";
import { notFound } from "next/navigation";

export type PopulatedEvent = Omit<IEvent, "category" | "organizer"> & {
  category: ICategory;
  organizer: Pick<IUser, "_id" | "firstName" | "lastName">;
};

type CreateEventParams = {
  event: Omit<IEvent, "_id">;
  path: string;
};

type GetAllEventsParams = {
  query: string;
  category: string;
  page: number;
  limit: number;
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

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteEvent = async ({
  eventId,
  path,
}: {
  eventId: string;
  path: string;
}) => {
  try {
    await connectToDB();

    await Event.findByIdAndDelete(eventId);

    revalidatePath(path);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

export const getAllEvents = async ({
  query,
  category,
  page,
  limit = 6,
}: GetAllEventsParams): Promise<{
  data: PopulatedEvent[];
  totalPages: number;
}> => {
  try {
    await connectToDB();
    let fetchedCategory;
    if (category) {
      fetchedCategory = await getCategoryByName(category);
    }

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? { category: { $regex: fetchedCategory?._id, $options: "i" } }
      : {};
    const condition = {
      $and: [titleCondition, categoryCondition],
    };
    const skipAmout = (Number(page) - 1) * limit;

    const eventsQuery = Event.find(condition)
      .sort({ createdAt: "desc" })
      .skip(skipAmout)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments();

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / 6),
    };
  } catch (error) {
    handleError(error);
    throw error;
  }
};
