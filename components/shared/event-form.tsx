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
import { useState } from "react";

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

type EventFormProps = { userId: string; type: "create" | "update" };

export const EventForm = ({ type, userId }: EventFormProps) => {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log("submit");
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                <Textarea
                  {...field}
                  className="h-72"
                  placeholder="Description"
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
              <div className="flex-center w-full rounded-md border border-input px-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background">
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
              </div>

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
              <div className="flex-center rounded-md border border-input px-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background">
                <FormLabel className="flex-center gap-1.5 text-muted-foreground">
                  <CalendarDaysIcon className="h-5 w-5" />
                  <p className="whitespace-nowrap font-normal">Start date:</p>
                </FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date) => field.onChange(date)}
                    // style input
                    className="!ml-1.5 h-10 w-full px-1.5 py-2 text-sm outline-none"
                    // style wrapper div
                    wrapperClassName="w-full"
                    dateFormat="MMM d, yyyy h:mm aa"
                    showTimeSelect
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex-center rounded-md border border-input px-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background">
                <FormLabel className="flex-center gap-1.5 text-muted-foreground">
                  <CalendarDaysIcon className="h-5 w-5" />
                  <p className="whitespace-nowrap font-normal">End date:</p>
                </FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date) => field.onChange(date)}
                    showTimeSelect
                    // locale={id}
                    dateFormat="MMM d, yyyy h:mm aa"
                    // style input
                    className="!ml-1.5 h-10 w-full px-1.5 py-2 text-sm outline-none"
                    // style wrapper div
                    wrapperClassName="w-full"
                  />
                </FormControl>
              </div>
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
              <div className="flex-center w-full rounded-md border border-input px-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background">
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
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex-center w-full rounded-md border border-input px-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background">
                <FormLabel>
                  <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Price"
                    type="number"
                    className="!mt-0 border-0 px-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>

                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className="flex-center !mt-0 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div> */}

        <Button
          size={"lg"}
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full "
        >
          {form.formState.isSubmitting
            ? "Submitting..."
            : `${type[0].toUpperCase() + type.substring(1)} Event`}
        </Button>
      </form>
    </Form>
  );
};
