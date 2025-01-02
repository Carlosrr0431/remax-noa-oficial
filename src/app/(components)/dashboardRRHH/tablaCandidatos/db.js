import { supabaseClient } from "@/supabase/client";

export const db = {
  getRecruits: async () => {
    const { data, error } = await supabaseClient
      .from("cuposDisponibles")
      .select("*");

    if (error) {
      console.error("Error fetching recruits:", error);
      return [];
    }

    return data || [];
  },

  getRecruitsByDateRange: async (startDate, endDate) => {
    const { data, error } = await supabaseClient
      .from("cuposDisponibles")
      .select("*")
      .gte("creaded_at", startDate)
      .lte("creaded_at", endDate);

    if (error) {
      console.error("Error fetching recruits by date range:", error);
      return [];
    }

    return data || [];
  },
};

// import { format, subDays } from "date-fns";
// import { Recruit, InterviewStatus } from "./data";
// import { supabaseClient } from "@/supabase/client";

// const sources = [
//   "LinkedIn",
//   "Indeed",
//   "Referral",
//   "Company Website",
//   "Job Fair",
// ];
// const interviewStatuses = ["No pasó", "Pasó 1", "Pasó 2", "Pasó 3"];

// const getRecruits = async () => {
//   const { data, error } = await supabaseClient
//     .from("cuposDisponibles")
//     .select("*");

//   let reclutados = [];

//   data.map((elem, index) => {
//     if (elem.reclutados != null) {
//       const applicationDate = elem.created_at
//         .substr(0, 10)
//         .split("-")
//         .reverse()
//         .join("/");
//       elem.reclutados.map((elem) => {
//         return reclutados.push({
//           ...elem,
//           applicationDate,
//         });
//       });
//     }
//   });

//   return reclutados;
// };

// export const db = {
//   recruits: await getRecruits(),

//   getRecruitsByDateRange: async (startDate, endDate) => {
//     console.log("DB RECRUITS: " + JSON.stringify(db.recruits));

//     return (
//       db.recruits != undefined &&
//       db.recruits.filter(
//         (recruit) =>
//           recruit.applicationDate >= startDate &&
//           recruit.applicationDate <= endDate
//       )
//     );
//   },
// };
