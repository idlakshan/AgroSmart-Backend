// src/api/crop.js
import express from "express";
import { createCrop } from "../application/crop.js";

const cropRouter = express.Router();
cropRouter.post("/", createCrop);

export default cropRouter;
