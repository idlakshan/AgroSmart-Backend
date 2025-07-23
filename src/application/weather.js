import axios from "axios";
import { districts } from '../application/dto/weather.js';
import { ApiError } from "../domain/errors/ApiError.js";

export const getWeatherStats = async (district) => {
  const location = districts[district];

  if (!location) {
    throw new ApiError(400, "Invalid district");
  }

  const { lat, lon } = location;


  const end = new Date().toISOString().split("T")[0];
  const start = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split("T")[0];


  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_mean,relative_humidity_2m_mean,precipitation_sum&timezone=auto`;

  const res = await axios.get(url);
  const data = res.data.daily;

  return {
    avg_temp_annual: average(data.temperature_2m_mean),           
    avg_humidity_annual: average(data.relative_humidity_2m_mean), 
    total_rainfall_annual: sum(data.precipitation_sum)            
  };
};


const average = (arr) => {
  const total = arr.reduce((sum, value) => sum + value, 0);
  return +(total / arr.length).toFixed(2);
};

const sum = (arr) => {
  return +arr.reduce((sum, value) => sum + value, 0).toFixed(2);
};
