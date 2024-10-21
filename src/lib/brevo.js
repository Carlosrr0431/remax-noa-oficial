"use server";
import { emailOfrecerCorrejido } from "@/app/(components)/emailOfrecerCorrejido";
import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const smtpEmail = new brevo.SendSmtpEmail();

export const sendEmail = async () => {
  smtpEmail.subject = "Hola, mundo";
  smtpEmail.to = [{ email: "giu40150135@gmail.com", name: "Carlos RR" }];

  smtpEmail.htmlContent = emailOfrecerCorrejido();

  smtpEmail.sender = {
    name: "Carlos RR REMAX",
    email: "carlos.facundo.rr@gmail.com",
  };

  await apiInstance.sendTransacEmail(smtpEmail);
};
