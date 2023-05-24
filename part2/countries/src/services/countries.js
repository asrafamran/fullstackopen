import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";
const API_KEY_WEATHERS = process.env.REACT_APP_WEATHER_API;

const getAll = () => {
  return axios.get(baseUrl + "api/all");
};

const getWeather = (lat, lang) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lang}&appid=${API_KEY_WEATHERS}`
  );
};

export default { getAll, getWeather };
