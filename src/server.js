const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Express server is running" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
