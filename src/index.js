import 'dotenv/config'
import express from "express";

import cors from 'cors'
import weatherRoutes from "./api/weather.js";
import cropRouter from './api/crop.js';
import { connectDB } from './infrastructure/db.js';
import { errorHandler } from './api/middleware/errorHandler.js';
import { clerkMiddleware } from '@clerk/express';


const app=express();

app.use(clerkMiddleware());

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
