require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase Client globally once
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase;

if (supabaseUrl && supabaseServiceKey && supabaseServiceKey !== "your_supabase_service_role_key_here") {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
} else {
  console.warn("Supabase credentials not configured correctly.");
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

    // 7. Success
    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  // We can log that server has started, which is not logging failed/rejected attempts.
  console.log(`Backend server running on http://localhost:${PORT}`);
});
