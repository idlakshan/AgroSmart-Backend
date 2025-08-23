import express from "express";
import { createCrop, generateResponse } from "../application/crop.js";
import isAuthenticated from "./middleware/authentication-middleware.js";
import isAdmin from "./middleware/authorization-middleware.js";
import { createEmbeddings } from "../application/embedding.js";
import { retrieve } from "../application/retrieve.js";

const cropRouter = express.Router();
cropRouter.post("/",isAuthenticated,isAdmin, createCrop);
cropRouter.post("/embeddings/create",createEmbeddings);
cropRouter.get("/search/retrieve", retrieve)

export default cropRouter;
