import { supabaseClient } from "@/supabase/client";
import moment from "moment-timezone";

const establecerFecha = (fecha1) => {
  if (fecha1 != null) {
    // var fecha2 = moment(new Date().toLocaleDateString().split('/').reverse().join('/'));

    let fecha2 = moment().tz("America/Argentina/Salta");

    return Math.abs(fecha2.diff(fecha1.split("/").reverse().join("/"), "days"));
  } else return 1;
};

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
      .select("*");

    let reclutados = [];

    data.map((elem, index) => {
      if (elem.reclutados != null) {
        const applicationDate = elem.diaPrimeraEntrevista;
        let interviewStatus = "";

        elem.reclutados.map((elem) => {
          if (elem.pasoTerceraEntrevista == "paso") {
            interviewStatus = "Pasó 3";
          } else if (elem.pasoSegundaEntrevista == "paso") {
            interviewStatus = "Pasó 2";
          } else if (elem.segundaEntrevista == true) {
            interviewStatus = "Pasó 1";
          } else if (elem.interviewPassed == "no paso")
            interviewStatus = "No pasó";
          else interviewStatus = "Pendiente";

          const fechaEval = moment(elem.diaPrimeraEntrevista, "DD:MM:YYYY");
          const inicio = moment(startDate, "DD:MM:YYYY");
          const fin = moment(endDate, "DD:MM:YYYY");

          if (fechaEval.isBetween(inicio, fin, null, "[]")) {
            return reclutados.push({
              ...elem,
              applicationDate,
              interviewStatus,
            });
          }
        });
      }
    });

    if (error) {
      console.error("Error fetching recruits by date range:", error);
      return [];
    }

    return reclutados || [];
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
// const { data, error } = await supabaseClient
//   .from("cuposDisponibles")
//   .select("*");

// let reclutados = [];

// data.map((elem, index) => {
//   if (elem.reclutados != null) {
//     const applicationDate = elem.created_at
//       .substr(0, 10)
//       .split("-")
//       .reverse()
//       .join("/");
//     elem.reclutados.map((elem) => {
//       return reclutados.push({
//         ...elem,
//         applicationDate,
//       });
//     });
//   }
// });

// return reclutados;
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
