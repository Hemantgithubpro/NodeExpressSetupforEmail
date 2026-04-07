const express = require("express");
const dotenv = require("dotenv");
const {
  createTransporter,
  getMailConfig,
  getMissingMailConfig,
} = require("./mailer");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Express server is running" });
});

app.get("/mail/verify", async (req, res) => {
  const mailConfig = getMailConfig();
  const missing = getMissingMailConfig(mailConfig);

  if (missing.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Missing SMTP configuration",
      missing,
    });
  }

  try {
    const { transporter } = createTransporter();
    await transporter.verify();

    return res.status(200).json({
      status: "ok",
      message: "Nodemailer is configured and SMTP is reachable",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "SMTP verification failed",
      error: error.message,
    });
  }
});

app.post("/send-email", async (req, res) => {
  const mailConfig = getMailConfig();
  const missing = getMissingMailConfig(mailConfig);

  if (missing.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Missing SMTP configuration",
      missing,
    });
  }

  const receiver = String(
    req.body?.receiverEmail || req.body?.to || mailConfig.recieverEmail || "",
  ).trim();
  const subject = String(req.body?.subject || "").trim();
  const body = String(req.body?.body || "").trim();

  if (!receiver || !subject || !body) {
    return res.status(400).json({
      status: "error",
      message: "receiverEmail (or to), subject, and body are required",
    });
  }

  try {
    const { transporter, config } = createTransporter();
    const result = await transporter.sendMail({
      from: config.from,
      to: receiver,
      subject,
      text: body,
    });

    return res.status(200).json({
      status: "ok",
      message: "Email sent successfully",
      messageId: result.messageId,
      accepted: result.accepted,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to send email",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
