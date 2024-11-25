import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export function longDate(date: dayjs.Dayjs | string) {
  dayjs.locale("pt-br");
  if (dayjs.isDayjs(date)) {
    return date.format("dddd, DD [de] MMMM [de] YYYY, HH:mm");
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date string");
  }
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

export function shortDate(date: dayjs.Dayjs | string) {
  dayjs.locale("pt-br");
  if (dayjs.isDayjs(date)) {
    return `${date.format("MMM DD, YYYY h:mm A")}`;
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date string");
  }
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}
