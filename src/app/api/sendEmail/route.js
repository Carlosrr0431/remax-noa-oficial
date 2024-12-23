import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { listaEmail, htmlContenido, titulo } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
      debug: true,
    });

    // const transporter = nodemailer.createTransport({
    //   host: "smtp-relay.brevo.com",
    //   port: 587,
    //   secure: true,
    //   auth: {
    //     user: "carlos.facundo.rr@gmail.com",
    //     pass: "xsmtpsib-76a2128cb4710a046853d4c02660283be4362b15d2995eb3cf33a7feff5a8e53-DsqfnKj6S9h1VtPB",
    //   },
    //   logger: true,
    //   debug: true,
    // });

    // imagen banner: https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
    // url: https://www.remaxnoa.com.ar/contactanos
    // Linkedin: https://www.linkedin.com/company/64931051/admin/dashboard/
    // Instagram: https://www.instagram.com/remaxnoa.arg/
    // Facebook: https://www.facebook.com/remaxnoasalta
    // WhatsApp: https://wa.me/+5493876852073?text=Quiero mas info...
    // castanedasantos@gmail.com

    // const transporter = nodemailer.createTransport({
    //   host: "smtp-relay.brevo.com",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: "7bfe44001@smtp-brevo.com",
    //     pass: "pQT8jIY3P5JcOZCk",
    //   },
    // });

    // const emailHtml = render(EmailTemplate());

    // comercialremaxnoa@gmail.com
    // rrhhremaxnoa@gmail.com
    // remaxnoacomercial@gmail.com

    const mailOption = {
      from: {
        name: "RE/MAX NOA RRHH",
        address: "rrhhremaxnoa@gmail.com",
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

// import { mailOptions, transporter } from "../../../../config/nodemailer";

// const CONTACT_MESSAGE_FIELDS = {
//   name: "Name",
//   email: "Email",
//   subject: "Subject",
//   message: "Message",
// };

// const generateEmailContent = (data) => {
//   const stringData = Object.entries(data).reduce(
//     (str, [key, val]) =>
//       (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
//     ""
//   );
//   const htmlData = Object.entries(data).reduce((str, [key, val]) => {
//     return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
//   }, "");

//   return {
//     text: stringData,
//     html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
//   };
// };

// const handler = async (req, res) => {
//   if (req.method === "POST") {

//     const data = req.body;

//     console.log(data);

//     if (!data || !data.name || !data.email || !data.subject || !data.message) {
//       return res.status(400).send({ message: "Bad request" });
//     }

//     try {
//       await transporter.sendMail({
//         ...mailOptions,
//         ...generateEmailContent(data),
//         subject: data.subject,
//       });

//       return res.status(200).json({ success: true });
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({ message: err.message });
//     }
//   }
//   return res.status(400).json({ message: "Bad request" });
// };
// export default handler;
