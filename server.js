import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 3000; // oder einen anderen Port deiner Wahl
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
