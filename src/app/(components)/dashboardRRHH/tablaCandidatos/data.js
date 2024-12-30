import { addDays, subDays, isValid } from "date-fns";
import { isWorkingDay } from "./date-utils";

const sources = [
  "LinkedIn",
  "Indeed",
  "Referral",
  "Company Website",
  "Job Fair",
];

export const generateRecruits = (count) => {
  const interviewStatuses = ["No pasó", "Pasó 1", "Pasó 2", "Pasó 3"];
  return Array.from({ length: count }, (_, i) => {
    let applicationDate;
    do {
      applicationDate = subDays(new Date(), Math.floor(Math.random() * 365));
    } while (!isWorkingDay(applicationDate));

    return {
      id: `recruit-${i + 1}`,
      name: `Candidate ${i + 1}`,
      source: sources[Math.floor(Math.random() * sources.length)],
      applicationDate,
      interviewStatus:
        interviewStatuses[Math.floor(Math.random() * interviewStatuses.length)],
    };
  });
};

export const recruits = generateRecruits(100);

export const getRecruitmentStats = (startDate, endDate) => {
  if (!isValid(startDate) || !isValid(endDate)) {
    return [];
  }

  const filteredRecruits = recruits.filter(
    (recruit) =>
      isValid(recruit.applicationDate) &&
      recruit.applicationDate >= startDate &&
      recruit.applicationDate <= endDate &&
      isWorkingDay(recruit.applicationDate)
  );

  const stats = sources.map((source) => ({
    name: source,
    count: filteredRecruits.filter((recruit) => recruit.source === source)
      .length,
  }));

  return stats.sort((a, b) => b.count - a.count);
};

export const getInterviewStatsBySource = (startDate, endDate) => {
  if (!isValid(startDate) || !isValid(endDate)) {
    return [];
  }

  const filteredRecruits = recruits.filter(
    (recruit) =>
      isValid(recruit.applicationDate) &&
      recruit.applicationDate >= startDate &&
      recruit.applicationDate <= endDate &&
      isWorkingDay(recruit.applicationDate)
  );

  const interviewStatuses = ["No pasó", "Pasó 1", "Pasó 2", "Pasó 3"];

  const stats = interviewStatuses.map((status) => {
    const statusObj = { status };
    sources.forEach((source) => {
      statusObj[source] = filteredRecruits.filter(
        (recruit) =>
          recruit.interviewStatus === status && recruit.source === source
      ).length;
    });
    return statusObj;
  });

  return stats;
};
