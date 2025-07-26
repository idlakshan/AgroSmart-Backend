import express from "express";
import { getWeatherStats } from "../application/weather.js";
import isAuthenticated from "./middleware/authentication-middleware.js";



const router = express.Router();


router.get("/weather/:district", isAuthenticated, async (req, res) => {
  try {
    const { district } = req.params;
    const result = await getWeatherStats(district);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
