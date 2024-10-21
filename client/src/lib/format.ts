import { formatDistanceToNow } from "date-fns";

export const formatDatePublish = (date: Date) => {
    const result = formatDistanceToNow(date, {
        addSuffix: true,
    });
    
    return result;
};