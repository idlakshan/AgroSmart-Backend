import 'dotenv/config'
import express from "express";

import cors from 'cors'
import weatherRoutes from "./api/weather.js";
import { errorHandler } from './middleware/errorHandler.js';
import cropRouter from './api/crop.js';
import { connectDB } from './infrastructure/db.js';


const app=express();
app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}));

app.use("/api", weatherRoutes);
app.use("/api/crops", cropRouter);

app.use(errorHandler);

const PORT=5001;

connectDB();

app.listen(PORT,()=>{
    console.log(`server is listen on port ${PORT}`);
})
