import axios from "axios";

export const DEFAULT_CITY = "Bogota";

const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY || "7df6df4172e09af5c15246b8bd6238f9";

const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "es",
  },
});

const getAirQuality = async (coords) => {
  try {
    const response = await weatherClient.get("/air_pollution", {
      params: {
        lat: coords.lat,
        lon: coords.lon,
      },
    });

    return response.data;
  } catch {
    return null;
  }
};

const getWeatherBundle = async (params) => {
  const [weatherResponse, forecastResponse] = await Promise.all([
    weatherClient.get("/weather", { params }),
    weatherClient.get("/forecast", { params }),
  ]);

  const airQuality = await getAirQuality(weatherResponse.data.coord);

  return {
    weather: weatherResponse.data,
    forecast: forecastResponse.data,
    airQuality,
  };
};

export const fetchWeatherBundleByCoords = (coords) =>
  getWeatherBundle({
    lat: coords.lat,
    lon: coords.lon,
  });

export const fetchWeatherBundleByCity = (city) =>
  getWeatherBundle({
    q: city,
  });

export const getWeatherErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      return "La clave de OpenWeather no es válida. Configura VITE_OPENWEATHER_API_KEY.";
    }

    if (statusCode === 404) {
      return "No encontré esa ciudad. Revisa el nombre e inténtalo otra vez.";
    }

    if (statusCode === 429) {
      return "Se alcanzó el límite de peticiones del servicio. Inténtalo de nuevo en unos minutos.";
    }
  }

  return "No pude cargar la información del clima en este momento.";
};
