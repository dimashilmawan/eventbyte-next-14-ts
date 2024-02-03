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

export const eventFormSchema = z
  .object({
    title: z.string().min(3),
    description: z.string().min(3).max(400),
    location: z.string().min(3).max(400),
    imageUrl: z.string().url({ message: "Image is Required" }),
    startDateTime: z.date(),
    endDateTime: z.date(),
    category: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .nullable()
      .refine((value) => value !== null, {
        message: "Please select a category.",
      }),
    // .transform((value, ctx) => {
    //   if (value == null)
    //     ctx.addIssue({
    //       code: "custom",
    //       message: "Must have Category",
    //     });
    //   return value;
    // }),
    // price: z.string(),
    price: z.number().positive().min(1),
    isFree: z.boolean(),
    url: z.string().url({ message: "Please provide a valid URL." }),
  })
  .refine((data) => data.endDateTime.getTime() > data.startDateTime.getTime(), {
    message: "End date must be after the start date.",
    path: ["endDateTime"],
  });
