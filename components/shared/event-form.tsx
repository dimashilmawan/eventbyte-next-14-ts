"use client";

// import id from "date-fns/locale/id";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { eventDefaultValues } from "@/constants";
import { eventFormSchema } from "@/lib/validator";
import { Dropdown } from "./dropdown";
import { Textarea } from "../ui/textarea";
import {
  CalendarDaysIcon,
  DollarSignIcon,
  LinkIcon,
  MapPinIcon,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCallback, useState } from "react";
import { FileUploader } from "./file-uploader";
import { useUploadThing } from "@/lib/uploadthing";
import { FormItemContainer } from "./form-item-container";
import { setHours, setMinutes } from "@/lib/utils";
// import { UploadDropzone } from "@/lib/uploadthing";

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

type EventFormProps = { userId: string; type: "create" | "update" };

export const EventForm = ({ type, userId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });

  const handleImageError = useCallback(
    (message: string) => {
      form.setError(
        "imageUrl",
        {
          message,
          type: "custom",
        },
        { shouldFocus: true },
      );
    },
    [form],
  );

  const handleClearImageError = useCallback(() => {
    form.clearErrors("imageUrl");
  }, [form]);

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        form.resetField("imageUrl");
        setFiles([]);
        handleImageError("Failed to upload image");
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }
    console.log(uploadedImageUrl);
  }

  function onerror(errors) {
    console.log(errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onerror)}
        className="space-y-6 md:space-y-6 "
      >
        {/* <div className="flex flex-col gap-x-4 gap-y-6 md:flex-row"> */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormControl>
                <div className="h-10">
                  <Dropdown />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div> */}

        {/* <div className="flex flex-col gap-x-4 gap-y-6 md:flex-row"> */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  {...field}
                  className="h-72 "
                  placeholder="Description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FileUploader
                  ref={field.ref}
                  onChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                  onImageError={handleImageError}
                  onClearImageError={handleClearImageError}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div> */}

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormItemContainer>
                <FormLabel>
                  <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Location"
                    className="!mt-0 border-0 px-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </FormItemContainer>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div className="flex flex-col gap-x-4 gap-y-6 md:flex-row"> */}
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormItemContainer>
                <FormLabel className="flex-center gap-1.5 text-muted-foreground">
                  <CalendarDaysIcon className="h-5 w-5" />
                  <p className="w-[4.75rem] whitespace-nowrap font-normal">
                    Start date:
                  </p>
                </FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date) => field.onChange(date)}
                    selectsStart
                    startDate={field.value}
                    endDate={form.getValues("endDateTime")}
                    showTimeSelect
                    minDate={field.value}
                    // style wrapper div
                    wrapperClassName="w-full"
                    dateFormat="MMM d, yyyy h:mm aa"
                  />
                </FormControl>
              </FormItemContainer>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormItemContainer>
                <FormLabel className="flex-center gap-1.5 text-muted-foreground">
                  <CalendarDaysIcon className="h-5 w-5" />
                  <p className="w-[4.75rem] whitespace-nowrap font-normal">
                    End date:
                  </p>
                </FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date) => field.onChange(date)}
                    startDate={form.getValues("startDateTime")}
                    endDate={field.value}
                    selectsEnd
                    showTimeSelect
                    minDate={form.getValues("startDateTime")}
                    // locale={id}
                    dateFormat="MMM d, yyyy h:mm aa"
                    // style wrapper div
                    wrapperClassName="w-full"
                  />
                </FormControl>
              </FormItemContainer>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div> */}

        {/* <div className="flex flex-col gap-x-4 gap-y-6 md:flex-row"> */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormItemContainer>
                <FormLabel>
                  <LinkIcon className="h-5 w-5 text-muted-foreground" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Url"
                    className="!mt-0 border-0 px-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </FormItemContainer>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          // render={({ field }) => {
          //   console.log(field.value);
          //   return (
          //     <Input
          //       type="number"
          //       value={field.value}
          //       onChange={(e) => {
          //         console.log(e.target.value);
          //         field.onChange(e.target.value);
          //       }}
          //     />
          //   );
          // }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormItemContainer>
                <FormLabel>
                  <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Price"
                    type="number"
                    min={1}
                    disabled={form.getValues("isFree")}
                    className="!mt-0 border-0 px-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>

                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className="flex-center">
                      <div className="flex-center gap-2">
                        <FormLabel className="whitespace-nowrap text-xs text-muted-foreground">
                          Free Ticket
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(e) => {
                              if (e) form.setValue("price", "");
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItemContainer>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div> */}

        <Button
          size={"lg"}
          disabled={form.formState.isSubmitting}
          type="submit"
          className="h-[40rem] w-full"
        >
          {form.formState.isSubmitting
            ? "Submitting..."
            : `${type[0].toUpperCase() + type.substring(1)} Event`}
        </Button>
      </form>
    </Form>
  );
};
