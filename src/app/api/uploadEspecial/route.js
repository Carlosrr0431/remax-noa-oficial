import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";
import { connectToDB } from "@/app/lib/db";
import EventoEspecial from "@/app/models/EventoEspecial";

cloudinary.config({
  cloud_name: "dlxwkq6bm",
  api_key: "312155376375165",
  api_secret: "OuD06O8Izb2EVH8rnWYr9Xjfeak",
});

export async function POST(request) {
  const data = await request.formData();

  const image = data.get("image");
  const titulo = data.get("titulo");
  const fecha = data.get("fecha");

  if (!image) {
    return NextResponse.json("No se ha subido ninguna imagen", {
      status: 400,
    });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) reject(err);

        resolve(result);
      })
      .end(buffer);
  });

  await connectToDB();

  const evento = await EventoEspecial.create({
    titulo: titulo,
    fecha: fecha,
    imagenUrl: result.secure_url,
  });

  return NextResponse.json({
    message: "imagen subida",
    url: result.secure_url,
  });
}
