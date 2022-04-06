import axios from "axios";
import fs from "fs";

const url = "http://localhost:5000/uploads";

const filePath = "./images/hydro-harvest.jpg";

const createImage = async (imageData) => {
  try {
    return await axios.post(url, imageData);
  } catch (error) {
    console.log(error.message);
  }
};

const contents = fs.readFileSync(filePath, { encoding: "base64" });
try {
  var res = await createImage({
    image: contents,
    title: "Title",
    description: "Description 1",
  });
  console.log(res);
} catch (error) {
  console.log(error);
}
