import express from "express";
import "dotenv/config";
import productRouter from "./controllers/products.controller.js";
import userRouter from "./controllers/users.controller.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando 🚀");
});

app.use("/products", productRouter);
app.use("/auth", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});