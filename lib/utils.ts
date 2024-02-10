import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
import qs from "query-string";
import Stripe from "stripe";

import { UrlQueryParams, RemoveUrlQueryParams } from "@/types";
import queryString from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addDaysToDate = (inputDate: Date, numberOfDays: number) => {
  const date = new Date(inputDate);

  // Add the specified number of days
  date.setDate(date.getDate() + numberOfDays);
  return date;
};

export const setHours = (inputDate: Date, hour: number) => {
  const resultDate = new Date(inputDate);
  resultDate.setHours(hour);
  return resultDate;
};

export const setMinutes = (inputDate: Date, minute: number) => {
  const resultDate = new Date(inputDate);
  resultDate.setMinutes(minute);
  return resultDate;
};

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatPrice = (price: string) => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return formattedPrice;
};

// export function formUrlQuery({ params, key, value }: UrlQueryParams) {
//   const currentUrl = qs.parse(params);

//   currentUrl[key] = value;

//   return qs.stringifyUrl(
//     {
//       url: window.location.pathname,
//       query: currentUrl,
//     },
//     { skipNull: true },
//   );
// }

// export function removeKeysFromQuery({
//   params,
//   keysToRemove,
// }: RemoveUrlQueryParams) {
//   const currentUrl = qs.parse(params);

//   keysToRemove.forEach((key) => {
//     delete currentUrl[key];
//   });

//   return qs.stringifyUrl(
//     {
//       url: window.location.pathname,
//       query: currentUrl,
//     },
//     { skipNull: true },
//   );
// }

export const handleError = async (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

type RemoveKeysFromQueryParams = {
  params: string;
  keysToBeRemoved: string[];
  pathname: string;
};

export const removeKeysFromQuery = ({
  params,
  keysToBeRemoved,
  pathname,
}: RemoveKeysFromQueryParams) => {
  const currentUrl = queryString.parse(params);

  // loop keysToBeRemoved Array and
  keysToBeRemoved.forEach((key) => {
    //delete currentUrl OBJECT field based on key of keysToBeRemoved ARRAY
    delete currentUrl[key];
  });

  return queryString.stringifyUrl(
    { url: pathname, query: currentUrl },
    { skipNull: true },
  );
};

type FormUrlQueryParams = {
  params: string;
  value: string;
  pathname: string;
  key: string;
};

export const formUrlQuery = ({
  params,
  value,
  key,
  pathname,
}: FormUrlQueryParams) => {
  const currentUrl = queryString.parse(params);
  currentUrl[key] = value;

  return queryString.stringifyUrl(
    { url: pathname, query: currentUrl },
    { skipNull: true },
  );
};
