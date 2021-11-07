import express from "express"
import cloudinary from "../utils/cloudinary.config.js";
import multer from "../utils/multer.js";
import ImagenesController from "./image.controller.js";

const router = express.Router()

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


router.post("/", multer.single("imagen"), async (req, res) => {
  try {
    //console.log(req.file);
    // Upload image to cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const imagen = {
      url: result.secure_url,
      id: result.public_id,
    };

    res.json(imagen);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/", async (req, res) => {
  try {

    // Delete image from cloudinary
    await cloudinary.v2.uploader.destroy(req.query.id);

    res.json({ status: "Eliminado" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", multer.single("imagen"), async (req, res) => {
  try {
    //console.log(req.file, req.params.id);
    // Delete image from cloudinary
    await cloudinary.v2.uploader.destroy(req.params.id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.v2.uploader.upload(req.file.path);
    }
    /*
    const imagen = {
      url: result?.secure_url || user.avatar,
      id: result?.public_id || user.cloudinary_id,
    };
    */
    const imagen = {
      url: result.secure_url,
      id: result.public_id,
    };
    res.json(imagen);
  } catch (err) {
    console.log(err);
  }
});


router.route("/").get(ImagenesController.apiGetPostIG)

/*
router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});
*/
export default router;