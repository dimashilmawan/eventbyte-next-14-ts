"use server";

import { connectToDB } from "../database";
import Category from "../database/models/category.model";
import { handleError } from "../utils";

export async function createCategory({
  categoryName,
}: {
  categoryName: string;
}) {
  try {
    await connectToDB();

    // const newUser: HydratedDocument<IUser> = await User.create(user);
    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllCategories() {
  try {
    await connectToDB();

    // const newUser: HydratedDocument<IUser> = await User.create(user);
    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
}
