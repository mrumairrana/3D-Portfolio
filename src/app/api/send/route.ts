import { z } from "zod";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    const serviceId = process.env.SERVICE_ID;
    const templateId = process.env.TEMPLATE_ID;
    const publicKey = process.env.PUBLIC_KEY;
    const privateKey = process.env.PRIVATE_KEY;

    console.log("EmailJS Config Check:", {
      hasServiceId: !!serviceId,
      hasTemplateId: !!templateId,
      hasPublicKey: !!publicKey,
      hasPrivateKey: !!privateKey
    });

    if (!serviceId || !templateId || !publicKey) {
      return Response.json({
        error: "EmailJS configuration is missing. Please check your .env.local file."
      }, { status: 500 });
    }

    const requestBody = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        from_name: zodData.fullName,
        from_email: zodData.email,
        message: zodData.message,
      },
    };

    console.log("Sending to EmailJS:", JSON.stringify(requestBody, null, 2));

    const emailjsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("EmailJS Response Status:", emailjsResponse.status);

    if (!emailjsResponse.ok) {
      const errorText = await emailjsResponse.text();
      console.error("EmailJS API error:", errorText);
      console.error("EmailJS Request Payload:", JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: zodData.fullName,
          from_email: zodData.email,
          message: zodData.message,
        },
      }));
      return Response.json({ error: `Failed to send email: ${errorText}` }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
