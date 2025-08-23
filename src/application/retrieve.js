import mongoose from "mongoose";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import Crop from "../infrastructure/schemas/cropSchema.js";

export const retrieve = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query || query === "") {
      const crops = (await Crop.find()).map((crop) => ({
        crop: crop,
        confidence: 1,
      }));

      res.status(200).json(crops);
      return;
    }

    const embeddingsModel = new OpenAIEmbeddings({
      model: "text-embedding-ada-002",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
      collection: mongoose.connection.collection("cropVectors"),
      indexName: "crop_vector_index",
    });

    const results = await vectorIndex.similaritySearchWithScore(query);

    console.log(results);

    const matchedCrops = await Promise.all(
      results.map(async (result) => {
        const crop = await Crop.findById(result[0].metadata._id);
        return {
          crop: crop,
          confidence: result[1],
        };
      })
    );

    res
      .status(200)
      .json(
        matchedCrops.length > 3 ? matchedCrops.slice(0, 4) : matchedCrops
      );
    return;
  } catch (error) {
    next(error);
  }
};