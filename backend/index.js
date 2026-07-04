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
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>You're on the AGAD waitlist</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: #0E2A52; }

  .display { font-family: 'Fraunces', Georgia, 'Times New Roman', serif; }
  .body-font { font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; }

  a.cta-btn:hover { background-color: #14509E !important; }
  a.footer-link:hover { color: #2C63D6 !important; }
  a.text-link:hover { opacity: 0.75 !important; }

  @media screen and (max-width: 620px) {
    .outer-pad { padding: 24px 12px !important; }
    .container { width: 100% !important; }
    .px-mobile { padding-left: 28px !important; padding-right: 28px !important; }
    .h1-mobile { font-size: 27px !important; line-height: 34px !important; }
    .hero-svg { width: 100% !important; height: auto !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#0E2A52;">

  <div style="display:none; font-size:1px; color:#0E2A52; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; mso-hide:all;">
    You're officially on the AGAD waitlist — your health records, finally kept in one place.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0E2A52;">
    <tr>
      <td align="center" class="outer-pad" style="padding: 56px 20px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" class="container" style="width:600px; max-width:600px; background-color:#FFFFFF; border-radius:18px; overflow:hidden;">

          <!-- Wordmark + top rule -->
          <tr>
            <td class="px-mobile" style="padding: 34px 48px 20px 48px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="middle" style="padding-right:8px;">
                          <img src="https://i.ibb.co/cKHGJrJY/Agadh-logo-low-resl.png" width="26" height="26" alt="AGAD" style="display:block; border-radius:7px;" />
                        </td>
                        <td valign="middle">
                          <span class="display" style="font-size:21px; font-weight:600; color:#0F2A4A; letter-spacing:0.5px;">AGAD</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right">
                    <span class="body-font" style="font-size:10.5px; font-weight:600; color:#8A97AC; letter-spacing:2px;">WAITLIST&nbsp;CONFIRMED</span>
                  </td>
                </tr>
              </table>
              <div style="height:1px; background-color:#E7ECF4; line-height:1px; font-size:1px; margin-top:18px;">&nbsp;</div>
            </td>
          </tr>

          <!-- Hero illustration panel -->
          <tr>
            <td style="background-color:#DCEBFC; padding: 0;">
              <img src="https://i.ibb.co/8D46TFSf/unnamed.png" width="600" height="300" class="hero-svg" style="display:block; border:0; width:100%; height:auto;" alt="AGAD Illustration" />
            </td>
          </tr>

          <!-- Headline + body -->
          <tr>
            <td class="px-mobile" style="padding: 44px 52px 6px 52px;">
              <div class="display h1-mobile" style="font-size:31px; line-height:38px; font-weight:600; color:#0F2A4A; text-align:center; padding-bottom:18px;">
                You're on the list, ${toName}.
              </div>
              <p class="body-font" style="margin:0 0 18px 0; font-size:15.5px; line-height:26px; color:#4B5C74; text-align:center;">
                Every visit to a doctor leaves behind a piece of your health story: a prescription here, a lab report there, a scan you'll need again someday. Most of it ends up scattered across folders, old messages, and stacks of paper.
              </p>
              <p class="body-font" style="margin:0; font-size:15.5px; line-height:26px; color:#4B5C74; text-align:center;">
                AGAD keeps it all in one place instead, organized and ready whenever you or your doctor need it.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding: 28px 24px 12px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="border-radius:28px; background-color:#1D5DD1;">
                    <a href="mailto:reach.agad@gmail.com?subject=Hi%20AGAD!" class="cta-btn body-font" style="display:inline-block; padding:14px 32px; font-size:14.5px; font-weight:600; color:#FFFFFF; text-decoration:none; border-radius:28px;">
                      Say hi to the team
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td class="px-mobile" style="padding: 34px 52px 0 52px;">
              <div style="height:1px; background-color:#E7ECF4; line-height:1px; font-size:1px;">&nbsp;</div>
            </td>
          </tr>

          <!-- While you wait -->
          <tr>
            <td class="px-mobile" style="padding: 34px 52px 8px 52px;">
              <span class="body-font" style="font-size:10.5px; font-weight:700; color:#8A97AC; letter-spacing:2px;">WHILE&nbsp;YOU&nbsp;WAIT</span>
              <div class="display" style="font-size:19px; font-weight:600; color:#0F2A4A; padding-top:8px;">
                Here's what happens next
              </div>
            </td>
          </tr>

          <tr>
            <td class="px-mobile" style="padding: 14px 52px 8px 52px;">

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td width="34" valign="top" style="padding-top:2px;">
                    <div style="width:22px; height:22px; border-radius:50%; background-color:#DCEBFC; text-align:center; line-height:22px;">
                      <span class="body-font" style="font-size:11px; font-weight:700; color:#1D5DD1;">1</span>
                    </div>
                  </td>
                  <td class="body-font" style="font-size:14.5px; line-height:23px; color:#4B5C74;">
                    <strong style="color:#0F2A4A;">Early access.</strong> You'll be one of the first through the door when AGAD opens.
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td width="34" valign="top" style="padding-top:2px;">
                    <div style="width:22px; height:22px; border-radius:50%; background-color:#DCEBFC; text-align:center; line-height:22px;">
                      <span class="body-font" style="font-size:11px; font-weight:700; color:#1D5DD1;">2</span>
                    </div>
                  </td>
                  <td class="body-font" style="font-size:14.5px; line-height:23px; color:#4B5C74;">
                    <strong style="color:#0F2A4A;">Real updates.</strong> A note from us only when there's something worth reading. No filler.
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
                <tr>
                  <td width="34" valign="top" style="padding-top:2px;">
                    <div style="width:22px; height:22px; border-radius:50%; background-color:#DCEBFC; text-align:center; line-height:22px;">
                      <span class="body-font" style="font-size:11px; font-weight:700; color:#1D5DD1;">3</span>
                    </div>
                  </td>
                  <td class="body-font" style="font-size:14.5px; line-height:23px; color:#4B5C74;">
                    <strong style="color:#0F2A4A;">A direct line.</strong> Reply anytime. A real person on the team reads every message.
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Story callout -->
          <tr>
            <td class="px-mobile" style="padding: 26px 52px 0 52px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F2A4A; border-radius:14px;">
                <tr>
                  <td style="padding: 26px 28px;">
                    <p class="display" style="margin:0 0 8px 0; font-size:16.5px; font-weight:600; color:#FFFFFF;">
                      Got a wild hospital or doctor story? 🩺
                    </p>
                    <p class="body-font" style="margin:0; font-size:14px; line-height:22px; color:#AAB6CB;">
                      The kind that starts with "you won't believe what happened at the clinic..." Reply and tell us. The best ones, we'll help find their way to more people.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Support line -->
          <tr>
            <td class="px-mobile" style="padding: 30px 52px 8px 52px;">
              <p class="body-font" style="margin:0; font-size:13px; line-height:21px; color:#8A97AC; text-align:center;">
                Questions? Just reply, or write to
                <a href="mailto:reach.agad@gmail.com" class="footer-link" style="color:#1D5DD1; text-decoration:none; font-weight:600;">reach.agad@gmail.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer divider -->
          <tr>
            <td class="px-mobile" style="padding: 20px 52px 0 52px;">
              <div style="height:1px; background-color:#E7ECF4; line-height:1px; font-size:1px;">&nbsp;</div>
            </td>
          </tr>

          <!-- Social icons -->
          <tr>
            <td align="center" style="padding: 26px 24px 16px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="#" style="text-decoration:none;">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#F1F4F9"/><path d="M13.5 8.5h1.6V6h-1.9c-2.1 0-3.2 1.2-3.2 3.2V11H8.4v2.4h1.6V18h2.6v-4.6h1.8l.3-2.4h-2.1V9.5c0-.6.2-1 .9-1z" fill="#7B889C"/></svg>
                    </a>
                  </td>
                  <td style="padding:0 8px;">
                    <a href="#" style="text-decoration:none;">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#F1F4F9"/><rect x="7.5" y="7.5" width="9" height="9" rx="2.5" stroke="#7B889C" stroke-width="1.3" fill="none"/><circle cx="12" cy="12" r="2.3" stroke="#7B889C" stroke-width="1.3" fill="none"/><circle cx="15.1" cy="8.9" r="0.6" fill="#7B889C"/></svg>
                    </a>
                  </td>
                  <td style="padding:0 8px;">
                    <a href="#" style="text-decoration:none;">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#F1F4F9"/><rect x="7" y="10" width="3" height="7" fill="#7B889C"/><circle cx="8.5" cy="7.3" r="1.4" fill="#7B889C"/><path d="M12 10h2.8v1.3c.5-.9 1.5-1.5 2.7-1.5 2 0 2.5 1.2 2.5 3.2V17h-3v-3.5c0-.8 0-1.9-1.2-1.9s-1.4 1-1.4 1.9V17h-2.4v-7z" fill="#7B889C"/></svg>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer links -->
          <tr>
            <td align="center" style="padding: 0 24px 8px 24px;">
              <p class="body-font" style="margin:0; font-size:12.5px; color:#9AA5B8;">
                <a href="#" class="footer-link" style="color:#9AA5B8; text-decoration:none;">About</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#" class="footer-link" style="color:#9AA5B8; text-decoration:none;">FAQs</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#" class="footer-link" style="color:#9AA5B8; text-decoration:none;">Unsubscribe</a>
              </p>
            </td>
          </tr>

          <!-- Legal -->
          <tr>
            <td align="center" style="padding: 18px 24px 34px 24px;">
              <p class="body-font" style="margin:0 0 4px 0; font-size:11.5px; line-height:18px; color:#B9C2D4;">
                You're receiving this because you joined the AGAD waitlist.
              </p>
              <p class="body-font" style="margin:0; font-size:11.5px; line-height:18px; color:#B9C2D4;">
                &copy; AGAD, Inc.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `
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
