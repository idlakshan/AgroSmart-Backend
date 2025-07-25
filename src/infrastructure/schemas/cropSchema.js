import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String,required: true},
  description: { type: String,required: true},
  image: { type: String },
  growthPeriod: { type: String },
  waterRequirements: { type: String },
  soilRequirements: { type: String,required: true },
  fertilizers: { type: String },
  avgTemperature: { type: Number ,required: true},
  avgHumidity: { type: Number,required: true },
  rainfall: { type: Number }
}, { timestamps: true });

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
