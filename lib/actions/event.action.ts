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

type UpdateEventParams = {
  event: IEvent;
  path: string;
};

type GetAllEventsParams = {
  query: string;
  category: string;
  page: number;
  limit: number;
};

type GetEventsByCategoryParams = {
  eventId: string;
  categoryId: string;
  page?: number;
  limit?: number;
};
type GetEventsByUserParams = {
  userId: string;
  page?: number;
  limit?: number;
};

type VerifyEventCreatedByUserParams = {
  userId: string;
  eventId: string;
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

export const updateEvent = async ({
  event,
  path,
}: UpdateEventParams): Promise<IEvent> => {
  try {
    await connectToDB();

    const eventToUpdate = await Event.findById(event._id);

    if (!eventToUpdate) throw new Error("Event to be updated not found");
    if (event.organizer.toString() !== eventToUpdate.organizer.toString())
      throw new Error("Unauthorized");

    const updatedEvent = await Event.findByIdAndUpdate(event._id, event, {
      new: true,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
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

const getCategoryByName = async (name: string): Promise<ICategory | null> => {
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
      ? {
          category: fetchedCategory?._id,
        }
      : {};
    const condition = {
      $and: [titleCondition, categoryCondition],
    };
    const skipAmout = (Number(page) - 1) * limit;

    const eventsQuery = Event.find(condition)
      .sort({ createdAt: "desc" })
      .skip(skipAmout)
      .limit(limit);

    const events: PopulatedEvent[] = await populateEvent(eventsQuery);
    const eventsCount = await Event.find(condition).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getEventsByCategory = async ({
  eventId,
  categoryId,
  page = 1,
  limit = 3,
}: GetEventsByCategoryParams): Promise<{
  data: PopulatedEvent[];
  totalPages: number;
}> => {
  try {
    await connectToDB();

    const condition = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const skipAmout = (Number(page) - 1) * limit;

    const eventsQuery = Event.find(condition)
      .sort({ createdAt: "desc" })
      .skip(skipAmout)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.find(condition).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
    throw error;
  }
};
export const getEventsByUser = async ({
  userId,
  page = 1,
  limit = 3,
}: GetEventsByUserParams): Promise<{
  data: PopulatedEvent[];
  totalPages: number;
}> => {
  try {
    await connectToDB();

    const condition = {
      organizer: userId,
    };

    const skipAmout = (Number(page) - 1) * limit;

    const eventsQuery = Event.find(condition)
      .sort({ createdAt: "desc" })
      .skip(skipAmout)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.find(condition).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const verifyEventCreatedByUser = async ({
  userId,
  eventId,
}: VerifyEventCreatedByUserParams): Promise<boolean> => {
  try {
    await connectToDB();

    const event = await Event.findById(eventId);
    if (!event) return false;

    const isVerify = event.organizer.equals(userId);
    return isVerify;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const isEventExist = async (eventId: string): Promise<boolean> => {
  try {
    await connectToDB();

    const event = await Event.findById(eventId);
    if (!event) return false;

    return true;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
