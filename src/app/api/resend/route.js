import { EmailTemplate } from "@/app/(components)/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend("re_UAphSviM_Ep8AKTkdGoEFLKHnE6GGCn7m");

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "remaxnoa@zohomail.com",
      to: ["carlos.facundo.rr@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
