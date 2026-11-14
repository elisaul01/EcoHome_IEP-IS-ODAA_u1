import { Router } from "express";
import UsersModel from "../models/users.model.js";
import JwtUtil from "../utils/jwt.util.js";

const router = Router();
const usersModel = new UsersModel();
const jwtUtil = new JwtUtil();

router.get("/", async (req, res) => {
  const users = await usersModel.getAll();
  res.json(users);
});

router.post("/signup", async (req, res) => {
  const data_user = req.body;
  const new_user = await usersModel.create(data_user);

  res.status(201).json({
    success: true,
    message: `Usuario ${new_user.username}  registrado correctamente!!!`,
  });
});

router.post("/login", async (req, res) => {
  const data_user = req.body;
  const user = await usersModel.login(data_user);
  
  if (!user) return res.status(400).send("Credenciales inválidos");

  const token = jwtUtil.generateToken(user);

  res.status(201).json({ message: "Ingreso correcto!!", token });
});

export default router;
