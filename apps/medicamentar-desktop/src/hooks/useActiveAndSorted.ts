import dayjs from "dayjs";

interface UseActiveAndSortedOptions {
  type: "event" | "medication" | "exam";
  continuousField?: string;
  startDateField?: string;
  endDateField?: string;
  dateField?: string;
}

export function useActiveAndSorted<T extends Record<string, any> = any>(
  items: T[],
  options: UseActiveAndSortedOptions
): T[] {
  const now = dayjs();
  const todayStart = now.startOf("day");

  const filtered = items.filter((item) => {
    if (options.type === "medication") {
      const isContinuous = options.continuousField
        ? item[options.continuousField]
        : false;
      const startDate = options.startDateField
        ? item[options.startDateField]
        : undefined;
      const period = item["period"];
      if (isContinuous && startDate) {
        return (
          dayjs(startDate).isSame(todayStart, "day") ||
          dayjs(startDate).isAfter(todayStart)
        );
      }
      if (startDate && period !== undefined) {
        const endDate = dayjs(startDate).add(period, "day");
        return endDate.isSame(todayStart, "day") || endDate.isAfter(todayStart);
      }
      return true;
    }
    if (options.type === "event") {
      const isContinuous = options.continuousField
        ? item[options.continuousField]
        : false;
      const startDate = options.startDateField
        ? item[options.startDateField]
        : undefined;
      const endDate = options.endDateField
        ? item[options.endDateField]
        : undefined;
      const date = options.dateField ? item[options.dateField] : undefined;
      if (startDate) {
        if (isContinuous) {
          return (
            dayjs(startDate).isSame(todayStart, "day") ||
            dayjs(startDate).isAfter(todayStart)
          );
        }
        if (endDate) {
          return (
            dayjs(endDate).isSame(todayStart, "day") ||
            dayjs(endDate).isAfter(todayStart)
          );
        }
      }
      if (date) {
        return (
          dayjs(date).isSame(todayStart, "day") ||
          dayjs(date).isAfter(todayStart)
        );
      }
      return true;
    }
    if (options.type === "exam") {
      const date = options.dateField ? item[options.dateField] : undefined;
      if (date) {
        return (
          dayjs(date).isSame(todayStart, "day") ||
          dayjs(date).isAfter(todayStart)
        );
      }
      return true;
    }
    return true;
  });

  const sorted = filtered.sort((a, b) => {
    if (options.type === "medication") {
      const isContinuousA = options.continuousField
        ? a[options.continuousField]
        : false;
      const isContinuousB = options.continuousField
        ? b[options.continuousField]
        : false;
      const startDateA = options.startDateField
        ? a[options.startDateField]
        : undefined;
      const startDateB = options.startDateField
        ? b[options.startDateField]
        : undefined;
      const periodA = a["period"];
      const periodB = b["period"];
      const dateA =
        isContinuousA && startDateA
          ? dayjs(startDateA)
          : startDateA && periodA !== undefined
            ? dayjs(startDateA).add(periodA, "day")
            : dayjs(0);
      const dateB =
        isContinuousB && startDateB
          ? dayjs(startDateB)
          : startDateB && periodB !== undefined
            ? dayjs(startDateB).add(periodB, "day")
            : dayjs(0);
      return dateA.diff(dateB);
    }
    if (options.type === "event") {
      const isContinuousA = options.continuousField
        ? a[options.continuousField]
        : false;
      const isContinuousB = options.continuousField
        ? b[options.continuousField]
        : false;
      const startDateA = options.startDateField
        ? a[options.startDateField]
        : undefined;
      const startDateB = options.startDateField
        ? b[options.startDateField]
        : undefined;
      const endDateA = options.endDateField
        ? a[options.endDateField]
        : undefined;
      const endDateB = options.endDateField
        ? b[options.endDateField]
        : undefined;
      const dateA = options.dateField ? a[options.dateField] : undefined;
      const dateB = options.dateField ? b[options.dateField] : undefined;
      let dA, dB;
      if (startDateA && startDateB) {
        dA = isContinuousA
          ? dayjs(startDateA)
          : endDateA
            ? dayjs(endDateA)
            : dayjs(0);
        dB = isContinuousB
          ? dayjs(startDateB)
          : endDateB
            ? dayjs(endDateB)
            : dayjs(0);
        return dA.diff(dB);
      }
      if (dateA && dateB) {
        dA = dayjs(dateA);
        dB = dayjs(dateB);
        return dA.diff(dB);
      }
      return 0;
    }
    if (options.type === "exam") {
      const dateA = options.dateField ? a[options.dateField] : undefined;
      const dateB = options.dateField ? b[options.dateField] : undefined;
      if (dateA && dateB) {
        return dayjs(dateA).diff(dayjs(dateB));
      }
      return 0;
    }
    return 0;
  });

  return sorted;
}
