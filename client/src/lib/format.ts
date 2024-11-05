import { HOST } from "@/actions/api.route";
import { format, formatDistanceToNow } from "date-fns";
import {
  formatInTimeZone,
  format as formatTZ,
  fromZonedTime,
  getTimezoneOffset,
  toZonedTime,
} from "date-fns-tz";

export const formatDatePublish = (date: Date) => {
  const result = formatDistanceToNow(date, {
    addSuffix: true,
  });

  return result;
};

export const formatDateBasis = (date: Date, formated: string) => {
  const result = format(date, formated);

  return result;
};

export const formatDateInTimeZone = (date: Date, fmt: string) => {
  // const timeZone = getTimezoneOffset('-07:00');
  const timeZone = 'Asia/Ho_Chi_Minh';

  const utcDate = fromZonedTime(date, 'Europe/Paris');
  
const output = formatInTimeZone(date, 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH:mm:ss');

  return output;
};

export const formatUrlImage = (url: string) => {
  return HOST + "/" + url;
};
