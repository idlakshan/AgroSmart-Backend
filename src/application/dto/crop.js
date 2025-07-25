import { z } from "zod";

export const cropSchema = z.object({
  name: z.string().min(1, "Crop name is required"),
  category: z.string(),
  description: z.string(),
  image: z.string().url("Invalid image URL"),
  growthPeriod: z.string().optional(),
  waterRequirements: z.string().optional(),
  soilRequirements: z.string(),
  fertilizers: z.string().optional(),
  avgTemperature: z.number().min(-50).max(60),
  avgHumidity: z.number().min(0).max(100),
  rainfall: z.number().min(0).optional()
});
