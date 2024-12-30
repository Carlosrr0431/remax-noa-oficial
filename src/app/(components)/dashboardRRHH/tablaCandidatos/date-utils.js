import {
  addDays,
  subDays,
  isWeekend,
  startOfWeek,
  endOfWeek,
  isSameDay,
  startOfMonth,
  endOfMonth,
  isValid,
  parse,
  format,
} from "date-fns";

export function getNextWorkingDay(date) {
  let nextDay = addDays(parse(date, "dd/MM/yyyy", new Date()), 1);
  while (isWeekend(nextDay)) {
    nextDay = addDays(nextDay, 1);
  }
  return format(nextDay, "dd/MM/yyyy");
}

export function getPreviousWorkingDay(date) {
  let previousDay = subDays(parse(date, "dd/MM/yyyy", new Date()), 1);
  while (isWeekend(previousDay)) {
    previousDay = subDays(previousDay, 1);
  }
  return format(previousDay, "dd/MM/yyyy");
}

export function getWorkWeekRange(date) {
  let from = startOfWeek(parse(date, "dd/MM/yyyy", new Date()), {
    weekStartsOn: 1,
  }); // Start from Monday
  let to = endOfWeek(parse(date, "dd/MM/yyyy", new Date()), {
    weekStartsOn: 1,
  }); // End on Sunday

  // Adjust 'from' if it's a weekend
  while (isWeekend(from)) {
    from = addDays(from, 1);
  }

  // Adjust 'to' if it's a weekend
  while (isWeekend(to)) {
    to = subDays(to, 1);
  }

  return { from: format(from, "dd/MM/yyyy"), to: format(to, "dd/MM/yyyy") };
}

export function moveWorkWeek(date, direction) {
  const daysToMove = direction === "forward" ? 7 : -7;
  let newDate = addDays(parse(date, "dd/MM/yyyy", new Date()), daysToMove);

  // If we land on a weekend, adjust to the next working day
  while (isWeekend(newDate)) {
    newDate =
      direction === "forward" ? addDays(newDate, 1) : subDays(newDate, 1);
  }

  return format(newDate, "dd/MM/yyyy");
}

export function isWorkingDay(date) {
  return !isWeekend(parse(date, "dd/MM/yyyy", new Date()));
}

export function getMonthRange(year, month) {
  const from = startOfMonth(new Date(year, month));
  const to = endOfMonth(new Date(year, month));
  return { from: format(from, "dd/MM/yyyy"), to: format(to, "dd/MM/yyyy") };
}

export function isDateInRange(date, start, end) {
  const dateObj = parse(date, "dd/MM/yyyy", new Date());
  const startObj = parse(start, "dd/MM/yyyy", new Date());
  const endObj = parse(end, "dd/MM/yyyy", new Date());
  return isValid(dateObj) && dateObj >= startObj && dateObj <= endObj;
}
