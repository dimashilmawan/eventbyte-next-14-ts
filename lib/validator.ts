import { z } from "zod";

// export const eventDefaultValues = {
//   title: "",
//   description: "",
//   location: "",
//   imageUrl: "",
//   startDateTime: new Date(),
//   endDateTime: new Date(),
//   categoryId: "",
//   price: "",
//   isFree: false,
//   url: "",
// };

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  imageUrl: z.string().min(3, "Image Url must be at least 3 characters"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
