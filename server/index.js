import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
app.use(express.json({ limit: "200kb" }));

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: corsOrigin,
  })
);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/api/contact", async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim();
    const phone = String(req.body?.phone || "").trim();
    const message = String(req.body?.message || "").trim();

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.LEADS_TO_EMAIL || user;

    if (!user || !pass) {
      return res.status(500).json({ error: "Email not configured" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio Lead" <${user}>`,
      to,
      replyTo: email,
      subject: `New portfolio lead: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
      html: buildLeadEmail(name, email, phone, message),
    });

    return res.json({ ok: true });
  } catch (_e) {
    return res.status(500).json({ error: "Email failed" });
  }
});

function buildLeadEmail(name, email, phone, message) {
  const now = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Lead</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #0a0a0a;
  font-family: Georgia, 'Times New Roman', serif;
  -webkit-font-smoothing: antialiased;
">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a; padding: 48px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="
          max-width: 600px;
          width: 100%;
          background-color: #111111;
          border-radius: 2px;
          border: 1px solid #222222;
          overflow: hidden;
        ">

          <!-- Top accent bar -->
          <tr>
            <td style="
              background: linear-gradient(90deg, #c9a96e 0%, #e8d5a3 50%, #c9a96e 100%);
              height: 3px;
              font-size: 0;
              line-height: 0;
            ">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 48px 48px 36px; border-bottom: 1px solid #1e1e1e;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <!-- Eyebrow -->
                    <p style="
                      margin: 0 0 12px 0;
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 10px;
                      letter-spacing: 0.25em;
                      text-transform: uppercase;
                      color: #c9a96e;
                    ">Incoming Lead</p>

                    <!-- Title -->
                    <h1 style="
                      margin: 0;
                      font-family: Georgia, serif;
                      font-size: 28px;
                      font-weight: normal;
                      color: #f0ece4;
                      line-height: 1.2;
                      letter-spacing: -0.01em;
                    ">New Portfolio<br><em style="color:#c9a96e;">Enquiry</em></h1>
                  </td>
                  <td align="right" valign="top">
                    <!-- Decorative monogram -->
                    <div style="
                      width: 52px;
                      height: 52px;
                      border: 1px solid #c9a96e;
                      display: inline-block;
                      line-height: 52px;
                      text-align: center;
                      font-family: Georgia, serif;
                      font-size: 20px;
                      color: #c9a96e;
                      border-radius: 1px;
                    ">✦</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Details -->
          <tr>
            <td style="padding: 36px 48px 0;">
              <p style="
                margin: 0 0 24px 0;
                font-family: 'Courier New', Courier, monospace;
                font-size: 10px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                color: #555555;
              ">Sender Details</p>

              <!-- Name row -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                <tr>
                  <td style="
                    width: 90px;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 11px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #555555;
                    vertical-align: top;
                    padding-top: 2px;
                  ">Name</td>
                  <td style="
                    font-family: Georgia, serif;
                    font-size: 18px;
                    color: #f0ece4;
                    letter-spacing: 0.01em;
                  ">${escapeHtml(name)}</td>
                </tr>
              </table>

              <!-- Email row -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 0;">
                <tr>
                  <td style="
                    width: 90px;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 11px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #555555;
                    vertical-align: top;
                    padding-top: 2px;
                  ">Email</td>
                  <td>
                    <a href="mailto:${escapeHtml(email)}" style="
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 13px;
                      color: #c9a96e;
                      text-decoration: none;
                      border-bottom: 1px solid #3a3020;
                      padding-bottom: 1px;
                    ">${escapeHtml(email)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Phone row -->
          <tr>
            <td style="padding: 16px 48px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 0;">
                <tr>
                  <td style="
                    width: 90px;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 11px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #555555;
                    vertical-align: top;
                    padding-top: 2px;
                  ">Mobile</td>
                  <td>
                    <a href="tel:${escapeHtml(phone)}" style="
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 13px;
                      color: #c9a96e;
                      text-decoration: none;
                      border-bottom: 1px solid #3a3020;
                      padding-bottom: 1px;
                    ">${escapeHtml(phone)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider with label -->
          <tr>
            <td style="padding: 36px 48px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    border-top: 1px solid #1e1e1e;
                    padding-top: 32px;
                  ">
                    <p style="
                      margin: 0 0 16px 0;
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 10px;
                      letter-spacing: 0.2em;
                      text-transform: uppercase;
                      color: #555555;
                    ">Message</p>

                    <!-- Message block -->
                    <div style="
                      background-color: #0d0d0d;
                      border-left: 2px solid #c9a96e;
                      border-radius: 0 2px 2px 0;
                      padding: 24px 24px 24px 28px;
                    ">
                      <p style="
                        margin: 0;
                        font-family: Georgia, serif;
                        font-size: 15px;
                        line-height: 1.8;
                        color: #b8b0a0;
                        white-space: pre-wrap;
                        word-break: break-word;
                      ">${escapeHtml(message)}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 32px 48px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    background: linear-gradient(135deg, #c9a96e, #e8d5a3);
                    border-radius: 1px;
                  ">
                    <a href="mailto:${escapeHtml(email)}?subject=Re: Your portfolio enquiry" style="
                      display: inline-block;
                      padding: 14px 32px;
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 11px;
                      letter-spacing: 0.2em;
                      text-transform: uppercase;
                      color: #0a0a0a;
                      text-decoration: none;
                      font-weight: bold;
                    ">Reply to ${escapeHtml(name)} →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 40px 48px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top: 1px solid #1a1a1a; padding-top: 28px;">
                    <p style="
                      margin: 0;
                      font-family: 'Courier New', Courier, monospace;
                      font-size: 10px;
                      letter-spacing: 0.15em;
                      color: #333333;
                      text-transform: uppercase;
                    ">Received · ${escapeHtml(now)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom accent bar -->
          <tr>
            <td style="
              background: linear-gradient(90deg, #1a1a1a 0%, #c9a96e 50%, #1a1a1a 100%);
              height: 1px;
              font-size: 0;
              line-height: 0;
            ">&nbsp;</td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
  
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

