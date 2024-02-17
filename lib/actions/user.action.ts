// check this out https://www.youtube.com/watch?v=nsMzWA6_3RA
// for proper handle server action and error
// the code bellow not proper handler server action and error

"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "@/lib/database";
import User, { IUser } from "@/lib/database/models/user.model";
import Order from "@/lib/database/models/order.model";
import Event from "@/lib/database/models/event.model";
import { handleError } from "@/lib/utils";

type CreateUserParams = Omit<IUser, "_id">;

type UpdateUserParams = Omit<IUser, "_id" | "clerkId" | "email">;

export async function createUser(user: CreateUserParams): Promise<IUser> {
  try {
    await connectToDB();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function getUserById(userId: string): Promise<IUser> {
  try {
    await connectToDB();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function updateUser(
  clerkId: string,
  user: UpdateUserParams,
): Promise<IUser> {
  try {
    await connectToDB();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDB();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } },
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } },
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);

    if (!deletedUser) {
      throw new Error("Failed to delete user");
    }
    revalidatePath("/");

    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
    throw error;
  }
}
