// check this out https://www.youtube.com/watch?v=nsMzWA6_3RA

"use server";
import { connectToDB } from "../database";
import User, { IUser } from "../database/models/user.model";

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong!";
  }
  return message;
};

export async function properGetUserById(
  userId: string,
): Promise<{ data?: IUser; error?: string }> {
  try {
    await connectToDB();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return { data: JSON.parse(JSON.stringify(user)) };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
