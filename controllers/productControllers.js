import productModel from "../models/productModel.js";
import { cloudinary } from "../cloudinary/cloudinaryConfig.js";

async function createProduct(req, res) {
  const { name, description } = req.body;



  const uploadedImage = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: "products",
      public_id: `${name}`,
      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "svg",
        "webp",
        "jfif",
        "ico",
      ],
    },
    function (error, result) {
      if (error) throw error;
    }
  );

  const cloudImg = uploadedImage.secure_url;

  const cloudImgPub = uploadedImage.public_id;

  try {
    const product = new productModel({
      name,
      description,
      image: cloudImg, // hier wird das Bildpfad gespeichert
      imgpub: cloudImgPub, // hier wird das public_id gespeichert
    });
    await product.save();
    res.status(201).json({ message: "Product erfolgreich gespeichert" });
  } catch (error) {
    res.status(500).json({ message: "Fehler bei der Speicherung" });
  }
}
async function getProducts(req, res) {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Produkte" });
  }
}

export { createProduct, getProducts };
