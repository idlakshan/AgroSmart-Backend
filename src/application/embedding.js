import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";

import { Document } from "@langchain/core/documents";
import Crop from "../infrastructure/schemas/cropSchema.js";
import mongoose from "mongoose";

export const createEmbeddings = async (req, res, next) => {
    try {
        const embeddingsModel = new OpenAIEmbeddings({
            model: "text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY,
        });

        const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
            collection: mongoose.connection.collection("cropVectors"),
            indexName: "crop_vector_index",
        });

        const crops = await Crop.find({});

        const docs = crops.map((crop) => {
            const { _id, avgHumidity, avgTemperature, rainfall, soilRequirements, description } = crop;
            const doc = new Document({
                pageContent: `Description: ${description} Soil requirements: ${soilRequirements}  Temperature: ${avgTemperature} Humidity: ${avgHumidity} Rainfall: ${rainfall}`,
                metadata: {
                    _id,
                },
            });
            return doc;
        });

        await vectorIndex.addDocuments(docs);

        res.status(200).json({
            message: "Embeddings created successfully",
        });
    } catch (error) {
        next(error);
    }
};