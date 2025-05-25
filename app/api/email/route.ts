import EmailTemplate from "@/emails";
import dayjs from "dayjs";
import { Resend } from "resend";

const apiKey = process.env.NEXT_PUBLIC_MAIL_API_KEY;
const sender = process.env.NEXT_PUBLIC_SENDER_MAIL;
const recipient = process.env.NEXT_PUBLIC_RECIPIENT_MAIL;

const resend = new Resend(process.env.NEXT_PUBLIC_MAIL_API_KEY);

export async function POST(request: Request) {
  const { email, start, end } = await request.json();
  if (!apiKey) {
    return Response.json({ error: "Missing Api Key!" }, { status: 404 });
  }

  if (!recipient) {
    return Response.json(
      { error: "Missing recipient email address!" },
      { status: 404 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Home Office Tracker <${sender}>`,
      to: [recipient],
      subject: "Session beendet!",
      react: EmailTemplate({
        email,
        start: dayjs(start).format("DD.MM.YYYY HH:mm"),
        end: dayjs(end).format("DD.MM.YYYY HH:mm"),
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
