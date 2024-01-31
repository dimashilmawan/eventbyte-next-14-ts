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
  title: z.string().min(3),
  description: z.string().min(3).max(400),
  location: z.string().min(3).max(400),
  imageUrl: z.string().min(3),
  startDateTime: z.date(),
  endDateTime: z.date(),
  category: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullable()
    .transform((value, ctx) => {
      if (value == null)
        ctx.addIssue({
          code: "custom",
          message: "Must have Category",
        });
      return value;
    }),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
