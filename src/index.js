import 'dotenv/config'
import express from "express";

import cors from 'cors'
import weatherRoutes from "./api/weather.js";


const app=express();
app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}));

app.use("/api", weatherRoutes);

const PORT=5001;


app.listen(PORT,()=>{
    console.log(`server is listen on port ${PORT}`);
})
