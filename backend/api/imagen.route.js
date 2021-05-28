import express from "express"
import cloudinary from "../utils/cloudinary.config.js";
import multer from "../utils/multer.js";
//import User, { find, findById, findByIdAndUpdate } from "../model/user";

const router = express.Router()

router.post("/", multer.single("imagen"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const imagen = {
      url: result.secure_url,
      id: result.public_id,
    };
    
    res.json(imagen);
  } catch (err) {
    console.log(err);
  }
});

/*
router.get("/", async (req, res) => {
  try {
    let user = await find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await findById(req.params.id);
    // Delete image from cloudinary
    await uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", single("image"), async (req, res) => {
  try {
    let user = await findById(req.params.id);
    // Delete image from cloudinary
    await uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };
    user = await findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

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