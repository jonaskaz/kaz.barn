import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Image from "./models/image.js";
import dotenv from "dotenv";

dotenv.config();
const mongoURL = process.env.MONGO_URL;

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

app.use("/uploads", async (req, res, next) => {
  const body = req.body;
  try {
    const newImage = await Image.create(body);
    newImage.save();
    console.log("created image " + body.title);
    res
      .status(201)
      .json({ message: "new image uploaded", createdPost: newImage });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
});

app.use("/", async (req, res, next) => {
  res.status(200).json({ message: "Welcome" });
});

mongoose
  .connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("database connected"))
  .catch((err) => err);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("listening at port " + PORT);
});
