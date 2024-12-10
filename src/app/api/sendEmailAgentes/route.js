import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { listaEmail, htmlContenido, titulo, nombre, correo, pass } =
      await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: correo,
        pass: pass,
      },
      logger: true,
      debug: true,
    });

    const mailOption = {
      from: {
        name: nombre,
        address: correo,
      },
      // to: [...listaEmail]
      to: listaEmail,
      // to: email,
      // subject: "¡Tu proximo emprendimiento esta cerca en RE/MAX NOA!",
      subject: titulo,
      html: htmlContenido,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Masivo enviado exitosamente!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Email Masivo fallado." },
      { status: 500 }
    );
  }
}
