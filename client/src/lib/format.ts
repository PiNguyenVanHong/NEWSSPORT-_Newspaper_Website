import { HOST } from "@/actions/api.route";
import { format, formatDistanceToNow } from "date-fns";
import {
  formatInTimeZone,
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
  
const output = formatInTimeZone(date, 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH:mm:ss');

  return output;
};

export const formatUrlImage = (url: string) => {
  return HOST + "/" + url;
};

export const formatTimeCountDown = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) return email; // Nếu email quá ngắn, không cần ẩn
  return `${localPart[0]}${"*".repeat(localPart.length - 2)}${localPart.slice(
    -1
  )}@${domain}`;
};