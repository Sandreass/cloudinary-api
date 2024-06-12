import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database/connectDB.js"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        console.log("der server ist mit der Datenbank verbunden!");
      //
      app.listen(process.env.PORT, () => {
        console.log(`Listining on port 3000`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();