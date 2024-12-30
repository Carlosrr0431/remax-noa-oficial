import { format, subDays } from "date-fns";
import { Recruit, InterviewStatus } from "./data";
import { supabaseClient } from "@/supabase/client";

const sources = [
  "LinkedIn",
  "Indeed",
  "Referral",
  "Company Website",
  "Job Fair",
];
const interviewStatuses = ["No pasó", "Pasó 1", "Pasó 2", "Pasó 3"];

function generateRecruits(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `recruit-${i + 1}`,
    name: `Candidate ${i + 1}`,
    source: sources[Math.floor(Math.random() * sources.length)],
    applicationDate: format(
      subDays(new Date(), Math.floor(Math.random() * 365)),
      "dd/MM/yyyy"
    ),
    interviewStatus:
      interviewStatuses[Math.floor(Math.random() * interviewStatuses.length)],
  }));
}

const getRecruits = async () => {
  const { data, error } = await supabaseClient
    .from("cuposDisponibles")
    .select("*");

  let reclutados = [];

  data.map((elem, index) => {
    if (elem.reclutados != null) {
      const applicationDate = elem.created_at
        .substr(0, 10)
        .split("-")
        .reverse()
        .join("/");
      elem.reclutados.map((elem) => {
        return reclutados.push({
          ...elem,
          applicationDate,
        });
      });
    }
  });

  return reclutados;
};

export const db = {
  recruits: await getRecruits(),

  //   getRecruits: async () => {
  //     // Simular un retraso de red
  //     await new Promise((resolve) => setTimeout(resolve, 100));
  //     return db.recruits;
  //   },

  getRecruitsByDateRange: async (startDate, endDate) => {
    console.log("DB RECRUITS: " + JSON.stringify(db.recruits));

    return (
      db.recruits != undefined &&
      db.recruits.filter(
        (recruit) =>
          recruit.applicationDate >= startDate &&
          recruit.applicationDate <= endDate
      )
    );
  },
};

// import { addDays, subDays } from "date-fns";
// import { supabaseClient } from "@/supabase/client";

// const sources = [
//   "LinkedIn",
//   "Indeed",
//   "Referral",
//   "Company Website",
//   "Job Fair",
// ];
// const interviewStatuses = ["No pasó", "Pasó 1", "Pasó 2", "Pasó 3"];

// function generateRecruits(count) {
//   return Array.from({ length: count }, (_, i) => ({
//     id: `recruit-${i + 1}`,
//     name: `Candidate ${i + 1}`,
//     source: sources[Math.floor(Math.random() * sources.length)],
//     applicationDate: subDays(new Date(), Math.floor(Math.random() * 365)),
//     interviewStatus:
//       interviewStatuses[Math.floor(Math.random() * interviewStatuses.length)],
//   }));
// }

// const getRecruits = async () => {
//   const { data, error } = await supabaseClient
//     .from("cuposDisponibles")
//     .select("*");

//   let reclutados = [];

//   data.map((elem, index) => {
//     if (elem.reclutados != null) {
//       elem.reclutados.map((elem) => {
//         return reclutados.push(elem);
//       });
//     }
//   });

//   console.log("DATOS: " + JSON.stringify(reclutados));

//   return data;
// };

// export const db = {
//   recruits: getRecruits(),

//   getRecruitsByDateRange: async (startDate, endDate) => {
//     await new Promise((resolve) => setTimeout(resolve, 100));
//     return db.recruits.filter(
//       (recruit) =>
//         recruit.applicationDate >= startDate &&
//         recruit.applicationDate <= endDate
//     );
//   },
// };
