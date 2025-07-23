import 'dotenv/config'
import express from "express";

import cors from 'cors'


const app=express();
app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}));

const PORT=5001;


app.listen(PORT,()=>{
    console.log(`server is listen on port ${PORT}`);
})
