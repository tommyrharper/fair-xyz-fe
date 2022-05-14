import { format } from "date-fns";

export const getDateInputString = (date: Date | null): string =>
  date ? format(new Date(date), "yyyy-MM-d") : '';
