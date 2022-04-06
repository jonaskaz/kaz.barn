import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  image: String,
  title: String,
  description: String,
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
