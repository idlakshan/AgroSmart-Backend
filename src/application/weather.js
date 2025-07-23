import axios from "axios";
import { districts } from '../application/dto/weather.js';

export const getWeatherStats = async (district) => {
  const location = districts[district];
  if (!location) throw new Error("Invalid district");

  const { lat, lon } = location;

  const end = new Date().toISOString().split("T")[0];
  const start = new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split("T")[0];

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_mean,relative_humidity_2m_mean&timezone=auto`;

  const res = await axios.get(url);
  const data = res.data.daily;

  return {
    avg_temp: average(data.temperature_2m_mean),
    avg_humidity: average(data.relative_humidity_2m_mean)
  };
};

const average = (arr) => {
  const total = arr.reduce((sum, value) => sum + value, 0);
  return +(total / arr.length).toFixed(2);
};
