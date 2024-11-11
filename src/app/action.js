"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { connectToDB } from "./lib/db";
import { v2 as cloudinary } from "cloudinary";
import Oracion from "./models/Oracion";
import { NextResponse } from "next/server";
import moment from "moment-timezone";
import { z } from "zod";

cloudinary.config({
  cloud_name: "dlxwkq6bm",
  api_key: "312155376375165",
  api_secret: "OuD06O8Izb2EVH8rnWYr9Xjfeak",
});

export async function guardarItem(datos, select) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  if (datos.cantidad == 0) {
    datos.cantidad = 1;
  }

  const result3 = await supabase.from("item").insert({
    unidadMedida: datos.unidadMedida,
    tipo: select,
    sector: datos.sector,
    proveedor: datos.proveedor,
    precioUnitario: datos.precioUnitario,
    nombre: datos.nombre,
    fechaVencimiento: datos.fechaVencimiento,
    descripcion: datos.descripcion,
    cantidad: datos.cantidad,
    caja: datos.caja,
  });

  console.log(result3);

  return { message: "Success" };
}

export async function enviarMailMasivo(formData1) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  console.log(JSON.parse(formData1.image2.arrayBuffer()));

  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  // const result = await new Promise((resolve, reject) => {
  //   cloudinary.uploader
  //     .upload_stream({}, (err, result) => {
  //       if (err) reject(err);

  //       resolve(result);
  //     })
  //     .end(buffer);
  // });

  // console.log("Resultado del pdf: " + result.secure_url);

  // const result3 = await supabase.from("formularioCV").insert({
  //   oficina: oficina,
  //   email: email,
  //   cv: result.secure_url,
  // });

  // console.log(result3);

  return { success: true, message: "File uploaded successfully!" };
}

export async function guardarFomulario(datos) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const result3 = await supabase.from("formularioIngreso").insert({
    nombre: datos.username,
    email: datos.email,
    oficina: datos.oficina,
    telefono: datos.telefono,
    cv: datos.cv,
  });

  console.log(result3);

  return { message: "Success" };
}

export async function guardarFomularioBaja(datos) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const result3 = await supabase.from("formularioBaja").insert({
    nombre: datos.name,
    email: datos.email,
    economicReason: datos.economicReason,
    personalReason: datos.personalReason,
    emotionalReason: datos.emotionalReason,
    companyReason: datos.companyReason,
  });

  console.log(result3);

  return { message: "Success" };
}

export async function actualizarEstado(id, nuevoEstado) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  console.log("id" + id);

  const resultado = await supabase
    .from("formularioCV")
    .update({
      estado: nuevoEstado,
    })
    .eq("id", id)
    .single();

  console.log("Resulado cambio de estado: " + resultado);

  return {
    message: "Success",
  };
}

export async function actualizarTracking(date, nuevoRegistro, id) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const agente = await supabase.from("empleados").select("*").eq("id", id);
  let resultado = null;

  console.log("Agente: " + agente.data[0].nombre);

  if (agente.data[0]?.formularios != null) {
    resultado = await supabase
      .from("empleados")
      .update({
        formularios: [
          ...agente.data[0]?.formularios,
          {
            fechaInicio: date.from.toLocaleDateString(),
            fechaFin: date.to.toLocaleDateString(),
            formularioReferidos: nuevoRegistro.formularioReferidos,
            formularioPrelisting: nuevoRegistro.formularioPrelisting,
            acm: nuevoRegistro.acm,
            seguimientoAcm: nuevoRegistro.seguimientoAcm,
            captaciones: nuevoRegistro.captaciones,
            propiedadesActivas: nuevoRegistro.propiedadesActivas,
          },
        ],
      })
      .eq("id", id)
      .single();
  } else {
    resultado = await supabase
      .from("empleados")
      .update({
        formularios: [
          {
            fechaInicio: date.from.toLocaleDateString(),
            fechaFin: date.to.toLocaleDateString(),
            formularioReferidos: nuevoRegistro.formularioReferidos,
            formularioPrelisting: nuevoRegistro.formularioPrelisting,
            acm: nuevoRegistro.acm,
            seguimientoAcm: nuevoRegistro.seguimientoAcm,
            captaciones: nuevoRegistro.captaciones,
            propiedadesActivas: nuevoRegistro.propiedadesActivas,
          },
        ],
      })
      .eq("id", id)
      .single();
  }

  const agente2 = await supabase.from("empleados").select("*");

  return {
    message: "Success",
    agentes: agente2.data,
  };
}

export async function uploadPDF(formData) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  let data = await supabase
    .from("correosEnviados")
    .select("*")
    .order("id", { ascending: true });

  let correosMasivos = await data.data[0].correos;

  const file = formData.get("file");
  const email = formData.get("email");
  const oficina = formData.get("oficina");
  let fuente = "";
  if (correosMasivos.includes(email)) {
    fuente = "Mailing Masivo";
  } else fuente = "Landing Page";

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) reject(err);

        resolve(result);
      })
      .end(buffer);
  });

  console.log("Resultado del pdf: " + result.secure_url);

  const result3 = await supabase.from("formularioCV").insert({
    oficina: oficina,
    email: email,
    cv: result.secure_url,
    fuente: fuente,
  });

  console.log(result3);

  return { success: true, message: "File uploaded successfully!" };
}

export async function postData(formData, userName, email) {
  const message = formData.get("message");

  console.log(message + " " + userName + " " + email);

  const Pusher = require("pusher");

  const pusher = new Pusher({
    appId: "1765391",
    key: "3f6bbe996346c336b473",
    secret: "cf6d3f62c67be65430ce",
    cluster: "sa1",
    useTLS: true,
  });

  await pusher.trigger("chat", "hello", {
    message: message,
    nombre: userName,
    email: email,
  });
}

export async function sendForm(formData) {
  const nombre = formData.get("name");
  const telefono = formData.get("phone");
  const motivo = formData.get("mensaje");

  connectToDB();

  const pedidoOracion = Oracion.create({
    nombre: nombre,
    telefono: telefono,
    motivo: motivo,
  });
}

export async function actualizarDatos(formData, idEvento) {
  const cookieStore = cookies();
  let mensaje = "";
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const titulo = formData.get("titulo");
  const descripcion = formData.get("descripcion");
  const precio = formData.get("precio");
  const imagen = formData.get("imagen");
  const tipo = formData.get("tipo");

  console.log("Entro:" + tipo);

  // connectToDB();

  if (imagen.size != 0) {
    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
        .end(buffer);
    });

    console.log("Resultado de la imagen: " + result.secure_url);

    const result2 = await supabase
      .from("cursos")
      .update({
        titulo: titulo,
        descripcion: descripcion,
        imagen: result.secure_url,
        precio: precio,
        tipo: tipo,
      })
      .eq("id", idEvento);

    console.log(JSON.stringify(result2));

    mensaje = "Se actualizo el curso correctamente";

    return { mensaje };
  } else if (imagen.size == 0) {
    const result2 = await supabase
      .from("cursos")
      .update({
        titulo: titulo,
        descripcion: descripcion,
        precio: precio,
        tipo: tipo,
      })
      .eq("id", idEvento);

    console.log(result2);
  }
}

export async function crearEvento(formData) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const titulo = formData.get("titulo");
  const descripcion = formData.get("descripcion");
  const precio = formData.get("precio");
  const imagen = formData.get("imagen");
  const tipo = formData.get("tipo");

  console.log("Entro crear evento");

  if (!imagen) {
    return NextResponse.json("No se ha subido ninguna imagen", {
      status: 400,
    });
  }

  const bytes = await imagen.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) reject(err);

        resolve(result);
      })
      .end(buffer);
  });

  if (imagen.size != 0) {
    const result2 = await supabase
      .from("cursos")
      .insert({
        titulo: titulo,
        descripcion: descripcion,
        imagen: result.secure_url,
        precio: precio,
        tipo: tipo,
      })
      .single();

    console.log(JSON.stringify(result2));
  }

  return { message: "Success" };
}

export async function crearBanner(formData) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const imagen = formData.get("imagen");
  const imagen2 = formData.get("imagenCelular");

  console.log("Entro crear evento");

  if (!imagen) {
    return NextResponse.json("No se ha subido ninguna imagen", {
      status: 400,
    });
  }

  if (imagen.size != 0) {
    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
        .end(buffer);
    });

    const result3 = await supabase
      .from("banners")
      .insert({
        imagenUrl: result.secure_url,
      })
      .single();

    console.log(JSON.stringify(result3));
  }

  if (imagen2 != 0) {
    const bytes2 = await imagen2.arrayBuffer();
    const buffer2 = Buffer.from(bytes2);

    const result2 = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
        .end(buffer2);
    });

    const result3 = await supabase
      .from("banners")
      .insert({
        imagenUrlCelular: result2.secure_url,
      })
      .single();
    console.log(JSON.stringify(result3));
  }

  return { message: "Success" };
}

export async function actualizarBanner(formData, id) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const imagen = formData.get("imagen");
  const imagen2 = formData.get("imagenCelular");

  console.log("Entro crear evento");

  if (!imagen) {
    return NextResponse.json("No se ha subido ninguna imagen", {
      status: 400,
    });
  }

  if (imagen.size != 0) {
    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
        .end(buffer);
    });

    const result3 = await supabase
      .from("banners")
      .update({
        imagenUrl: result.secure_url,
      })
      .eq("id", id);

    console.log(JSON.stringify(result3));
  }

  if (imagen2 != 0) {
    const bytes2 = await imagen2.arrayBuffer();
    const buffer2 = Buffer.from(bytes2);

    const result2 = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
        .end(buffer2);
    });

    const result3 = await supabase
      .from("banners")
      .update({
        imagenUrlCelular: result2.secure_url,
      })
      .eq("id", id);

    console.log(JSON.stringify(result3));
  }

  return { message: "Success" };
}

export async function userAdmin(datos, tipo, id) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const nombre = datos?.name;
  const email = datos?.email;
  const role = datos?.role;
  const oficina = datos?.oficina;

  if (tipo == "Agregar") {
    const result = await supabase
      .from("usuarios")
      .select("email")
      .match({ email: email })
      .single();

    const data = result.data;

    if (data?.email == undefined) {
      const result2 = await supabase.from("usuarios").insert({
        nombre: nombre,
        email: email,
        imagenUrl: "",
        role: role,
        oficina: oficina,
      });

      console.log(result2);
    } else {
      const result2 = await supabase
        .from("usuarios")
        .update({
          nombre: nombre,
          email: email,
          role: role,
          oficina: oficina,
        })
        .eq("email", email);
    }
  } else if (tipo == "Modificar") {
    const result2 = await supabase
      .from("usuarios")
      .update({
        nombre: nombre,
        email: email,
        role: role,
        oficina: oficina,
      })
      .eq("id", id);
  } else if (tipo == "Eliminar") {
    const result2 = await supabase
      .from("usuarios")
      .update({
        role: "member",
      })
      .eq("id", id);
  } else if (tipo == "Eliminar Usuario") {
    const result2 = await supabase
      .from("usuarios")
      .update({
        role: "member",
      })
      .eq("id", id);
  }
  return { message: "Success" };
}

function checkTelef(cadena) {
  let plant = /^(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
  if (plant.test(cadena)) return "Responde a la plantilla";
  else return "No responde a la plantilla";
}

export async function adminUser(datos, tipo, id, precio) {
  // const cookieStore = cookies();
  // let message = "";
  // let error = [];

  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //   {
  //     cookies: () => cookieStore,
  //   }
  // );

  const nombre = datos?.name;
  const email = datos?.email;
  const subtitulo = datos?.subtitulo;
  const mensaje = datos?.mensaje;
  // const telefono = datos?.telefono;
  // const dni = datos?.dni;
  // const plan = datos?.plan;
  // const edad = datos?.edad;
  // const dias = datos?.dias;

  // const err = checkTelef(telefono);
  // error[0] = err;
  // error[1] = "";

  // const result2 = await supabase
  //   .from("usuarios")
  //   .select("*")
  //   .or(`dni.eq.${dni},email.eq.${email}`);

  // const result1 = await supabase
  //   .from("usuarios")
  //   .select("*")
  //   .match({ dni: dni });

  // const result3 = await supabase
  //   .from("usuarios")
  //   .select("*")
  //   .match({ email: email });

  // const dataDni = result1.data;
  // const data = result2.data;
  // const dataEmail = result3.data;

  // if (tipo == "Agregar") {
  //   if (
  //     (data == null || data?.length == 0) &&
  //     err != "No responde a la plantilla"
  //   ) {
  //     const result2 = await supabase.from("usuarios").insert({
  //       nombre: nombre,
  //       email: email,
  //       imagenUrl: "",
  //       telefono: telefono,
  //       dni: dni,
  //       edad: edad,
  //       tipoPlan: plan,
  //       fechaPago: moment().tz("America/Argentina/Salta").format("DD/MM/yyyy"),
  //       dias: 0,
  //       puntos: 0,
  //       role: "member",
  //       dias: dias
  //     });

  //     const result3 = await supabase.from("pagos").insert({
  //       nombre: nombre,
  //       email: email,
  //       dni: dni,
  //       tipoPlan: plan,
  //       fechaPago: moment().tz("America/Argentina/Salta").format("DD/MM/yyyy"),
  //       monto: precio,
  //     });

  //     message = "Se agrego correctamente";
  //     console.log(result2);
  //   } else if (data.length >= 1) {
  //     message = "Los datos ya existen.";
  //     error[1] = "DNI o Email ya existente";
  //   }
  // } else if (tipo == "Modificar") {
  //   if (data.length == 0 && err != "No responde a la plantilla") {
  //     const result2 = await supabase
  //       .from("usuarios")
  //       .update({
  //         nombre: nombre,
  //         email: email,
  //         imagenUrl: "",
  //         telefono: telefono,
  //         dni: dni,
  //         edad: edad,
  //         tipoPlan: plan,
  //         dias: dias
  //       })
  //       .eq("id", id);

  //     message = "Se actualizo correctamente";
  //   } else if (
  //     data.length == 1 &&
  //     id == data[0].id &&
  //     err != "No responde a la plantilla"
  //   ) {
  //     if (data[0].tipoPlan != plan) {
  //       const result2 = await supabase
  //         .from("usuarios")
  //         .update({
  //           nombre: nombre,
  //           email: email,
  //           imagenUrl: "",
  //           telefono: telefono,
  //           dni: dni,
  //           edad: edad,
  //           tipoPlan: plan,
  //           dias: data[0].dias,
  //           fechaPago: moment()
  //             .tz("America/Argentina/Salta")
  //             .format("DD/MM/yyyy"),
  //         })
  //         .eq("id", id);
  //     } else {
  //       const result2 = await supabase
  //         .from("usuarios")
  //         .update({
  //           nombre: nombre,
  //           email: email,
  //           imagenUrl: "",
  //           telefono: telefono,
  //           dni: dni,
  //           edad: edad,
  //           tipoPlan: plan,
  //           dias: dias
  //         })
  //         .eq("id", id);
  //     }

  //     message = "Se actualizo correctamente";
  //   } else {
  //     message = "No se actualizo correctamente";

  //     if (dataDni.length >= 1 && dataDni[0].id != id)
  //       error[1] = "DNI ya existente";

  //     if (dataDni.length >= 1 && dataEmail[0].id != id)
  //       error[1] = "Email ya existente";
  //   }
  // } else if (data.length >= 1) {
  //   message = "Los datos ya existen.";

  //   if (dataDni.length >= 1 && dataDni[0].id != id)
  //     error[1] = "DNI ya existente";

  //   if (dataDni.length >= 1 && dataEmail[0].id != id)
  //     error[1] = "Email ya existente";
  // } else if (tipo == "Eliminar") {
  //   const result2 = await supabase.from("usuarios").delete().eq("id", id);
  // }
  // console.log(message);
  // return { message, error };

  return { message: "Mensaje enviado correctamente" };
}

export async function eliminarItem(id) {
  console.log("Ingreso a registrar!!");

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const result2 = await supabase.from("item").delete().eq("id", id);

  console.log(result2);

  return { message: "Success" };
}

export async function registrarIngreso(dias, id) {
  console.log("Ingreso a registrar!!");

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  const result2 = await supabase
    .from("usuarios")
    .update({
      dias: dias,

      horaIngreso: moment().tz("America/Argentina/Salta").format("HH:mm"),
      fechaIngreso: moment().tz("America/Argentina/Salta").format("DD/MM/yyyy"),
    })
    .eq("id", id);

  console.log(result2);

  return { message: "Success" };
}

export async function actualizarPlan(datos, precio, id) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  console.log(datos.name, datos.email, datos.plan, datos.modoPago, precio);

  const result3 = await supabase.from("pagos").insert({
    nombre: datos.name,
    email: datos.email,
    tipoPlan: datos.plan,
    fechaPago: moment().tz("America/Argentina/Salta").format("DD/MM/yyyy"),
    monto: precio,
    modoPago: datos.modoPago,
  });

  console.log(result3);

  const result2 = await supabase
    .from("usuarios")
    .update({
      tipoPlan: datos.plan,
      dias: 0,
      fechaPago: moment().tz("America/Argentina/Salta").format("DD/MM/yyyy"),
    })
    .eq("id", id);

  console.log(result2);

  return { message: "Success" };
}

export async function actualizarNotificacion(tipo, id, dias) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: () => cookieStore,
    }
  );

  if (tipo == "Solicitar ingreso") {
    const result2 = await supabase
      .from("usuarios")
      .update({
        ingresoApp: "Solicitar Ingreso",
      })
      .eq("id", id);

    console.log(result2);
  } else if (tipo == "Confirmar Ingreso") {
    const result2 = await supabase
      .from("usuarios")
      .update({
        ingresoApp: "Ingreso permitido",
        dias: dias,
        horaIngreso: moment().tz("America/Argentina/Salta").format("HH:mm"),
        fechaIngreso: moment()
          .tz("America/Argentina/Salta")
          .format("DD/MM/yyyy"),
      })
      .eq("id", id);

    console.log(result2);
  }

  // const result2 = await supabase
  //   .from("usuarios")
  //   .update({
  //     dias: 0,
  //     horaIngreso: hora,
  //     fechaIngreso: new Date().toLocaleDateString(),
  //   })
  //   .eq("id", id);

  return { message: "Success" };
}
