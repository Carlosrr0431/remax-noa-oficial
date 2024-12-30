import { db } from "./db";
import { isWorkingDay, isDateInRange } from "./date-utils";

const sources = [
  "LinkedIn",
  "Indeed",
  "Referral",
  "Company Website",
  "Job Fair",
];

export const getRecruitmentStats = async (startDate, endDate) => {
  const recruits = await db.getRecruitsByDateRange(startDate, endDate);

  console.log("RECLUTADOS: " + JSON.stringify(recruits));

  const stats = sources.map((source) => ({
    name: source,
    count: recruits.filter((recruit) => recruit.source === source).length,
  }));

  return stats.sort((a, b) => b.count - a.count);
};

export const getInterviewStatsBySource = async (startDate, endDate) => {
  const recruits = await db.getRecruitsByDateRange(startDate, endDate);

  const interviewStatuses = ["No pasó", "Pasó 1", "Pasó 2", "Pasó 3"];

  const stats = interviewStatuses.map((status) => {
    const statusObj = { status };
    sources.forEach((source) => {
      statusObj[source] = recruits.filter(
        (recruit) =>
          recruit.interviewStatus === status && recruit.source === source
      ).length;
    });
    return statusObj;
  });

  return stats;
};

export const getRecruits = async (startDate, endDate, isMonthView) => {
  const recruits = await db.getRecruitsByDateRange(startDate, endDate);

  return recruits.filter(
    (recruit) => isMonthView || isWorkingDay(recruit.applicationDate)
  );
};
