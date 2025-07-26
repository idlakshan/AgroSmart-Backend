
import { ApiError } from "../domain/errors/ApiError.js";
import Crop from "../infrastructure/schemas/cropSchema.js";
import { cropSchema } from "./dto/crop.js";
;


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


