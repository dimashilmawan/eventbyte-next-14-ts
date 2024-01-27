import { model, models, Schema, Document, InferSchemaType } from "mongoose";

// export interface IEvent extends Document {
//   _id: string;
//   title: string;
//   description?: string;
//   location?: string;
//   createdAt: Date;
//   imageUrl: string;
//   startDateTime: Date;
//   endDateTime: Date;
//   price: string;
//   isFree: boolean;
//   url?: string;
//   category: { _id: string; name: string };
//   organizer: { _id: string; firstName: string; lastName: string };
// }

// export const EventSchema = new Schema({
//   title: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   description: { type: String },
//   location: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   startDateStart: { type: Date, default: Date.now },
//   startDateEnd: { type: Date, default: Date.now },
//   isFree: { type: Boolean, default: false },
//   price: { type: String },
//   url: { type: String },

//   organizer: { type: Schema.Types.ObjectId, ref: "User" },
//   category: { type: Schema.Types.ObjectId, ref: "Category" },
// });

// const Event = models.Event || model("Event", EventSchema);

// export default Event;

export const EventSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  startDateStart: { type: Date, default: Date.now },
  startDateEnd: { type: Date, default: Date.now },
  isFree: { type: Boolean, default: false },
  price: { type: String },
  url: { type: String },

  organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

export type IEvent = InferSchemaType<typeof EventSchema>;

const Event = models.Event || model("Event", EventSchema);

export default Event;
