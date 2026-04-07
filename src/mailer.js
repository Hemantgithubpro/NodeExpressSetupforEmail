const nodemailer = require("nodemailer");

function getMailConfig() {
  return {
    host: process.env.SMTP_SERVER || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
    from: process.env.EMAIL_USER || "",
    recieverEmail: process.env.RECIEVER_EMAIL || "",
  };
}

function getMissingMailConfig(config) {
  const missing = [];
  if (!config.host) missing.push("SMTP_SERVER");
  if (!config.port) missing.push("SMTP_PORT");
  if (!config.user) missing.push("EMAIL_USER");
  if (!config.pass) missing.push("EMAIL_PASS");
  if (!config.recieverEmail) missing.push("RECIEVER_EMAIL");
  return missing;
}

function createTransporter() {
  const config = getMailConfig();
  const secure = config.port === 465;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  return { transporter, config };
}

module.exports = {
  createTransporter,
  getMailConfig,
  getMissingMailConfig,
};
