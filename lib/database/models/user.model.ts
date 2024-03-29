import { InferSchemaType, Model, model, models, Schema } from "mongoose";

export const UserSchema = new Schema({
  clerkId: { required: true, type: String, unique: true },
  email: { required: true, type: String, unique: true },
  username: { required: true, type: String, unique: true },
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  photo: { required: true, type: String },
});

export type IUser = InferSchemaType<typeof UserSchema> & {
  _id: string;
};

// const User = models.User || model<IUser, Model<IUser>>("User", UserSchema);
// const User = model<IUser, Model<IUser>>("User", UserSchema);
// const User: Model<IUser> = models.User || model("User", UserSchema);
// const User = models.User || model("User", UserSchema);

const User: Model<
  InferSchemaType<typeof UserSchema> & { events: string[]; orders: string[] }
> = models.User || model("User", UserSchema);

export default User;
