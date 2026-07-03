require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase Client globally once (reloaded)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase;

if (supabaseUrl && supabaseServiceKey && supabaseServiceKey !== "your_supabase_service_role_key_here") {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
} else {
  console.warn("Supabase credentials not configured correctly.");
}

// Initialize Nodemailer transporter with Gmail
const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
let mailer;

if (gmailUser && gmailAppPassword) {
  mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });
} else {
  console.warn("Gmail credentials not configured. Welcome emails will be disabled.");
}

// Helper: send personalised welcome email
async function sendWelcomeEmail(toEmail, toName) {
  if (!mailer) return;

  const mailOptions = {
    from: `"Agad" <${gmailUser}>`,
    to: toEmail,
    subject: "Welcome to Agad – You're on the list! 🎉",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Agad</title>
      </head>
      <body style="margin:0;padding:0;background:#f0f9ff;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;padding:40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(14,165,233,0.10);">

                <!-- Header gradient banner -->
                <tr>
                  <td style="background:linear-gradient(135deg,#0ea5e9 0%,#0284c7 100%);padding:36px 40px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:800;letter-spacing:-0.5px;">AGAD</h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;letter-spacing:1px;text-transform:uppercase;">Early Access Waitlist</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px 40px 32px;">
                    <h2 style="margin:0 0 16px;color:#0f172a;font-size:24px;font-weight:700;">Hey ${toName}, welcome aboard! 👋</h2>
                    <p style="margin:0 0 20px;color:#475569;font-size:16px;line-height:1.75;">
                      You've officially secured your spot on the <strong style="color:#0ea5e9;">Agad waitlist</strong>.
                      We're beyond excited to have you with us!
                    </p>
                    <p style="margin:0 0 32px;color:#475569;font-size:16px;line-height:1.75;">
                      Our team is working hard to build something truly special.
                      You'll be among the <strong>first to know</strong> when we open the doors — so keep an eye on your inbox.
                    </p>

                    <!-- Highlight box -->
                    <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:8px;padding:20px 24px;margin-bottom:32px;">
                      <p style="margin:0;color:#0369a1;font-size:15px;font-weight:600;">🚀 What's coming?</p>
                      <p style="margin:8px 0 0;color:#475569;font-size:14px;line-height:1.7;">
                        Agad is building a smarter, faster way to manage your health —
                        designed to save you time and give you peace of mind.
                      </p>
                    </div>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="https://www.instagram.com/reach.agad" target="_blank"
                            style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#0284c7);color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(14,165,233,0.35);">
                            Follow us on Instagram
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
                    <p style="margin:0 0 4px;color:#94a3b8;font-size:13px;">Questions? Reach us at</p>
                    <a href="mailto:reach.agad@gmail.com" style="color:#0ea5e9;font-size:13px;font-weight:600;text-decoration:none;">reach.agad@gmail.com</a>
                    <p style="margin:16px 0 0;color:#cbd5e1;font-size:12px;">© 2025 Agad. All rights reserved.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  await mailer.sendMail(mailOptions);
}

// Enable CORS scoped to our landing page domain (allowing local dev and dynamic production domains via ALLOWED_ORIGIN env var)
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
if (process.env.ALLOWED_ORIGIN) {
  allowedOrigins.push(process.env.ALLOWED_ORIGIN);
}

app.use(cors({
  origin: allowedOrigins,
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Helper to extract client IP address
const getClientIp = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "127.0.0.1";
};

// POST route to check if email already exists (lowercased)
app.post("/api/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!supabase) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    const { data: existingEmail, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .ilike("email", normalizedEmail)
      .maybeSingle();

    if (checkError) {
      return res.status(500).json({ error: "Database error" });
    }

    if (existingEmail) {
      return res.status(200).json({ exists: true });
    }

    return res.status(200).json({ exists: false });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST route to register waitlist entry
app.post("/api/join-waitlist", async (req, res) => {
  try {
    const { name, email, turnstileToken } = req.body;

    // 1. Validation: check presence of required fields
    if (!name || !email || !turnstileToken) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Cloudflare Turnstile Verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    const clientIp = getClientIp(req);
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    
    const verificationResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: turnstileToken,
        remoteip: clientIp
      })
    });

    const verificationResult = await verificationResponse.json();
    if (!verificationResult.success) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!supabase) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    // 4. Duplicate Check: check if email already exists
    const { data: existingEmail, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .ilike("email", normalizedEmail)
      .maybeSingle();

    if (checkError) {
      return res.status(500).json({ error: "Database error" });
    }

    if (existingEmail) {
      return res.status(200).json({ success: false, reason: "already_registered" });
    }

    // 5. Rate Limiting: count rows matching IP within the last 60 minutes
    const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from("waitlist")
      .select("ip_address", { count: "exact", head: true })
      .eq("ip_address", clientIp)
      .gte("created_at", sixtyMinutesAgo);

    if (countError) {
      return res.status(500).json({ error: "Database error" });
    }

    if (count !== null && count >= 20) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    // 6. Insertion: insert record into waitlist
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert([{ name, email: normalizedEmail, ip_address: clientIp }]);

    if (insertError) {
      return res.status(500).json({ error: "Failed to join waitlist" });
    }

    // 7. Send welcome email (non-blocking — failure won't affect registration)
    sendWelcomeEmail(normalizedEmail, name).catch((err) => {
      console.error("Welcome email failed to send:", err.message);
    });

    // 8. Success
    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  // We can log that server has started, which is not logging failed/rejected attempts.
  console.log(`Backend server running on http://localhost:${PORT}`);
});
