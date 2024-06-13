import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database/connectDB.js"
import productRouter from "./routes/productRoutes.js";

const connectionString = process.env.MONGO_URL;

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/products", productRouter);
const startServer = async () => {
    try {
      await connectDB(connectionString);
      console.log("verbindung mit MONGODB hat geklaptt!");
      //
      app.listen(port, () => {
        console.log(`Port läuft auf Port: ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();