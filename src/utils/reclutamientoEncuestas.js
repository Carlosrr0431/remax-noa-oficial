import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { addMinutes, format, isBefore, setHours, setMinutes } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateScore(answers) {
  const maxScorePerQuestion = 5;
  const maxScore = Object.keys(answers).length * maxScorePerQuestion;

  const totalScore = Object.values(answers).reduce((total, answerStr) => {
    try {
      const answer = JSON.parse(answerStr);
      return total + (answer.score || 0);
    } catch (e) {
      console.error("Error parsing answer:", e);
      return total;
    }
  }, 0);

  const percentage = (totalScore / maxScore) * 100;
  const passed = percentage >= 60;

  return {
    totalScore,
    maxScore,
    percentage,
    passed,
  };
}

export function formatDateTime(date) {
  return format(date, "EEEE d 'de' MMMM 'a las' HH:mm", { locale: es });
}

export function generateTimeSlots(date) {
  const slots = [];
  const startTime = setHours(setMinutes(date, 0), 8); // 8:00
  const endTime = setHours(setMinutes(date, 0), 10); // 10:00

  let currentSlot = startTime;
  while (isBefore(currentSlot, endTime)) {
    slots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, 20);
  }

  return slots;
}
