import {
  addDays,
  subDays,
  isWeekend,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";

export function getNextWorkingDay(date) {
  let nextDay = addDays(date, 1);
  while (isWeekend(nextDay)) {
    nextDay = addDays(nextDay, 1);
  }
  return nextDay;
}

export function getPreviousWorkingDay(date) {
  let previousDay = subDays(date, 1);
  while (isWeekend(previousDay)) {
    previousDay = subDays(previousDay, 1);
  }
  return previousDay;
}

export function getWorkWeekRange(date) {
  let from = startOfWeek(date, { weekStartsOn: 1 }); // Start from Monday
  let to = endOfWeek(date, { weekStartsOn: 1 }); // End on Sunday

  // Adjust 'from' if it's a weekend
  while (isWeekend(from)) {
    from = addDays(from, 1);
  }

  // Adjust 'to' if it's a weekend
  while (isWeekend(to)) {
    to = subDays(to, 1);
  }

  return { from, to };
}

export function moveWorkWeek(date, direction) {
  const daysToMove = direction === "forward" ? 7 : -7;
  let newDate = addDays(date, daysToMove);

  // If we land on a weekend, adjust to the next working day
  while (isWeekend(newDate)) {
    newDate =
      direction === "forward" ? addDays(newDate, 1) : subDays(newDate, 1);
  }

  return newDate;
}

export function isWorkingDay(date) {
  return !isWeekend(date);
}
