
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  name: string;
  email: string;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email }: ConfirmationEmailRequest = await req.json();

    const subject = "Confirm your Quantum Supply Chain profile signup";
    const html = `
      <h2>Welcome to Quantum Supply Chain Platform!</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Thank you for signing up. Please confirm your email by clicking the link in the email you received from us.</p>
      <p>If you have questions, just reply to this email.</p>
      <hr>
      <p><small>You received this because someone (hopefully you) signed up on our platform.</small></p>
    `;

    const data = await resend.emails.send({
      from: "Quantum Supply Chain <onboarding@resend.dev>",
      to: [email],
      subject,
      html,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
