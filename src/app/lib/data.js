"use server";

import { revalidatePath } from "next/cache.js";
import Donation from "../models/Donation.js";
import Evento from "../models/Evento.js";
import EventoEspecial from "../models/EventoEspecial.js";
import Oracion from "../models/Oracion.js";
import User from "../models/User.js";
import { connectToDB } from "./db.js";
import { cookies } from "next/headers.js";
import { createServerClient } from "@supabase/ssr";

export const fetchPayments = async () => {
  try {
    await connectToDB();

    const payments = await Donation.find();

    const data = JSON.parse(JSON.stringify(payments));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOraciones = async () => {
  try {
    await connectToDB();

    const oraciones = await Oracion.find();

    const data = JSON.parse(JSON.stringify(oraciones));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchEventos = async () => {
  try {
    await connectToDB();

    const eventos = await Evento.find();

    const data = JSON.parse(JSON.stringify(eventos));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchEventosEspeciales = async () => {
  try {
    await connectToDB();

    const eventos = await EventoEspecial.find();

    const data = JSON.parse(JSON.stringify(eventos));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsuarios = async () => {
  try {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: () => cookieStore,
      }
    );

    const { data, error } = await supabase
      .from("usuarios")
      .select()
      .filter("role", "in", '("admin","user admin")')
      .order("id", { ascending: true });

    console.log("Usuarios: " + data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const EliminarEvento = async (id, tipo) => {
  try {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: () => cookieStore,
      }
    );

    if (tipo == "Cursos") {
      const { data, error } = await supabase
        .from("cursos")
        .delete()
        .eq("id", id);
    } else if (tipo == "Banners Home") {
      const { data, error } = await supabase
        .from("banners")
        .delete()
        .eq("id", id);
    } else if (tipo == "Eliminar Usuario") {
      const { data, error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", id);
    } else if (tipo == "Eliminar Usuario Admin") {
      const result2 = await supabase
        .from("usuarios")
        .update({
          role: "member",
        })
        .eq("id", id);
    }

    return { mensaje: "Se elimino correctamente" };
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuario = async (email) => {
  try {
    await connectToDB();

    const user = await User.findOne({ email: email });

    const data = JSON.parse(JSON.stringify(user));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const modificarPermiso = async (email, permiso) => {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        permisoChat: permiso,
      },
      { new: true }
    );

    console.log(user);

    const data = JSON.parse(JSON.stringify(user));

    // revalidatePath("/radio")

    return data;
  } catch (error) {
    console.log(error);
  }
};

// const evento = await Evento.findByIdAndUpdate(
//   idEvento,
//   {
//     titulo: titulo,
//     fecha: fecha,
//     imagenUrl: result.secure_url,
//   },
//   { new: true }
// );
