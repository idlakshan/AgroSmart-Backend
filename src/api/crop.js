import express from "express";
import { createCrop } from "../application/crop.js";
import isAuthenticated from "./middleware/authentication-middleware.js";
import isAdmin from "./middleware/authorization-middleware.js";

const cropRouter = express.Router();
cropRouter.post("/",isAuthenticated,isAdmin, createCrop);

export default cropRouter;
