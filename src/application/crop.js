
import { ApiError } from "../domain/errors/ApiError.js";
import Crop from "../infrastructure/schemas/cropSchema.js";
import { cropSchema } from "./dto/crop.js";
import OpenAI from "openai";

export const createCrop = async (req, res, next) => {
  try {
    const validatedData = cropSchema.parse(req.body);
    const crop = new Crop(validatedData);
    await crop.save();
    res.status(201).json({ message: "Crop created successfully", data: crop });
  } catch (err) {
    if (err.name === "ZodError") {
      return next(new ApiError(400, err.errors.map(e => e.message).join(", ")));
    }
    next(err);
  }
};



export const generateResponse = async (req, res, next) =>{
  const {prompt} = req.body;
  const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
            role: "user",
            content: prompt
                
        },
    ],
    store:true,
});

console.log(completion.choices[0].message);

res.status(200).json({message:completion.choices[0].message.content})
}




