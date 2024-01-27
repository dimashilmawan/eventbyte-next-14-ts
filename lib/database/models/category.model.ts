import { Schema, model, models, InferSchemaType, Document } from "mongoose";

// export interface ICategory extends Document {
//   _id:string; name:string;
// }

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export type ICategory = InferSchemaType<typeof CategorySchema>;

const Category = models.Category || model("Category", CategorySchema);

export default Category;
