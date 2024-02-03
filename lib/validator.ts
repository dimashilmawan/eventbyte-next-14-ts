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
    title: z.string().trim().min(3),
    description: z.string().trim().min(3).max(400),
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
    price: z.string(),
    // price: z.string().refine(
    //   (value) => {
    //     const numericValue = Number(value);
    //     return !isNaN(numericValue) && numericValue > 0;
    //   },
    //   {
    //     message: "Price must be a valid number greater than zero",
    //   },
    // ),
    isFree: z.boolean(),
    url: z.string().url({ message: "Please provide a valid URL." }),
  })
  .superRefine((data, ctx) => {
    if (data.startDateTime.getTime() > data.endDateTime.getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be after the start date.",
        path: ["endDateTime"],
      });
    }
    if (data.price === "" && !data.isFree) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide a price or set to Free ticket",
        path: ["price"],
      });
    }
  });
// .refine((data) => data.endDateTime.getTime() > data.startDateTime.getTime(), {
//   message: "End date must be after the start date.",
//   path: ["endDateTime"],
// });
