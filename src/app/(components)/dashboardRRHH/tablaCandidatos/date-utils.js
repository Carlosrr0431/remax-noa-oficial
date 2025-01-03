import {
  parse,
  format,
  addDays,
  subDays,
  isWeekend,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isValid,
} from "date-fns";

function parseDate(dateString) {
  if (typeof dateString !== "string") {
    console.error("Invalid date input:", dateString);
    return null; // Return current date as fallback
  }
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  return isValid(parsedDate) ? parsedDate : new Date();
}

export function getNextWorkingDay(date) {
  try {
    let nextDay = addDays(parseDate(date), 1);
    while (isWeekend(nextDay)) {
      nextDay = addDays(nextDay, 1);
    }
    return format(nextDay, "dd/MM/yyyy");
  } catch (error) {
    console.error("Error in getNextWorkingDay:", error);
    return date; // Return original date as fallback
  }
}

export function getPreviousWorkingDay(date) {
  try {
    let previousDay = subDays(parseDate(date), 1);
    while (isWeekend(previousDay)) {
      previousDay = subDays(previousDay, 1);
    }
    return format(previousDay, "dd/MM/yyyy");
  } catch (error) {
    console.error("Error in getPreviousWorkingDay:", error);
    return date; // Return original date as fallback
  }
}

export function getWorkWeekRange(date) {
  try {
    let from = startOfWeek(parseDate(date), { weekStartsOn: 1 }); // Start from Monday
    let to = endOfWeek(parseDate(date), { weekStartsOn: 1 }); // End on Sunday

    // Adjust 'from' if it's a weekend
    while (isWeekend(from)) {
      from = addDays(from, 1);
    }

    // Adjust 'to' if it's a weekend
    while (isWeekend(to)) {
      to = subDays(to, 1);
    }

    return { from: format(from, "dd/MM/yyyy"), to: format(to, "dd/MM/yyyy") };
  } catch (error) {
    console.error("Error in getWorkWeekRange:", error);
    return { from: date, to: date }; // Return original date as fallback
  }
}

export function moveWorkWeek(date, direction) {
  try {
    const daysToMove = direction === "forward" ? 7 : -7;
    let newDate = addDays(parseDate(date), daysToMove);

    // If we land on a weekend, adjust to the next working day
    while (isWeekend(newDate)) {
      newDate =
        direction === "forward" ? addDays(newDate, 1) : subDays(newDate, 1);
    }

    return format(newDate, "dd/MM/yyyy");
  } catch (error) {
    console.error("Error in moveWorkWeek:", error);
    return date; // Return original date as fallback
  }
}

export function isWorkingDay(date) {
  try {
    return !isWeekend(parseDate(date));
  } catch (error) {
    console.error("Error in isWorkingDay:", error);
    return false; // Assume it's not a working day if there's an error
  }
}

export function getMonthRange(year, month) {
  const from = startOfMonth(new Date(year, month));
  const to = endOfMonth(new Date(year, month));
  return { from: format(from, "dd/MM/yyyy"), to: format(to, "dd/MM/yyyy") };
}

export function isDateInRange(date, start, end) {
  try {
    const dateObj = parseDate(date);
    const startObj = parseDate(start);
    const endObj = parseDate(end);
    return dateObj >= startObj && dateObj <= endObj;
  } catch (error) {
    console.error("Error in isDateInRange:", error);
    return false; // Assume it's not in range if there's an error
  }
}

export function formatDate(date) {
  if (typeof date === "string") {
    date = parseDate(date);
  }
  return format(date, "dd/MM/yyyy");
}
