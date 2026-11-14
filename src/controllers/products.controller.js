import { Router } from "express";
import ProductsModel from "../models/products.model.js";
import authJwt from "../middlewares/auth.jwt.js";
import authRole from "../middlewares/auth.role.js";

const router = Router();
const productsModel = new ProductsModel();

router.get("/", async (req, res) => {
  const products = await productsModel.getAll();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  const products = await productsModel.getOne(id);
  res.json(products);
});

router.post("/", authJwt, authRole("admin"),  async (req, res) => {
  const data_product = req.body;
  const new_product = await productsModel.create(data_product);

  res.json(new_product);
});

router.put("/", authJwt, authRole("admin"), async (req, res) => {
  const data_product = req.body;
  const update_product = await productsModel.update(data_product);

  res.status(201).json({
    success: true,
    message: "Producto actualizado",
    data: update_product
  });
});

router.delete("/:id", authJwt, authRole("admin"), async (req, res) => {
  const { id } = req.params;
  const delete_product = await productsModel.delete(id);

  res.status(201).json({
    success: true,
    message: "Producto eliminado",
    data: delete_product
  });
});

export default router;
