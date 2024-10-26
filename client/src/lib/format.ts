import { format, formatDistanceToNow } from "date-fns";

export const formatDatePublish = (date: Date) => {
  const result = formatDistanceToNow(date, {
    addSuffix: true,
  });

  return result;
};

export const formatDateBasis = (date: Date, formated: string) => {
    const result = format(date, formated);

    return result
};
