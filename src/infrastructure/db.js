import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        const MONGODB_URL = process.env.MONGODB_URL;

        if (!MONGODB_URL) {
            throw new Error("MONGODB_URL is not set")
        }

        await mongoose.connect(MONGODB_URL);
        console.log("connected to the database");
    } catch (error) {
        console.log(error);
        console.log("Error connecting to the database");


    }
}