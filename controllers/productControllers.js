import productModel from "../models/productModel.js";

async function createProduct(req, res) {
  const { name, description } = req.body;
  try {
    const product = new productModel({
      name,
      description,
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
