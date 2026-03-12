import { useEffect, useState } from "react";
import {
  DEFAULT_CITY,
  fetchWeatherBundleByCity,
  fetchWeatherBundleByCoords,
  getWeatherErrorMessage,
} from "../services/weatherApi";
import { useLocalStorageState } from "./useLocalStorageState";

const GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 600000,
};

const RECENT_CITIES_LIMIT = 6;

const createRecentCityEntry = (weather) => ({
  label: `${weather.name}, ${weather.sys.country}`,
  query: `${weather.name},${weather.sys.country}`,
});

const mergeRecentCities = (weather, currentCities = []) => {
  const nextCity = createRecentCityEntry(weather);
  const filteredCities = currentCities.filter(
    (city) => city.query !== nextCity.query,
  );

  return [nextCity, ...filteredCities].slice(0, RECENT_CITIES_LIMIT);
};

export function useWeatherData() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [recentCities, setRecentCities] = useLocalStorageState(
    "weather-studio-recent-cities",
    [],
  );

  const searchByCity = async (city) => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return;
    }

    const hasData = Boolean(weather);

    if (hasData) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError("");
    setNotice("");

    try {
      const bundle = await fetchWeatherBundleByCity(trimmedCity);
      setWeather(bundle.weather);
      setForecast(bundle.forecast);
      setAirQuality(bundle.airQuality);
      setRecentCities((currentCities) =>
        mergeRecentCities(bundle.weather, currentCities),
      );
    } catch (requestError) {
      setError(getWeatherErrorMessage(requestError));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const loadCurrentLocation = async () => {
    const hasData = Boolean(weather);

    if (hasData) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError("");
    setNotice("");

    const getPosition = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, GEO_OPTIONS);
      });

    try {
      if (!navigator.geolocation) {
        throw new Error("unsupported");
      }

      const position = await getPosition();
      const bundle = await fetchWeatherBundleByCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });

      setWeather(bundle.weather);
      setForecast(bundle.forecast);
      setAirQuality(bundle.airQuality);
      setRecentCities((currentCities) =>
        mergeRecentCities(bundle.weather, currentCities),
      );
    } catch (geoError) {
      const fallbackMessage =
        geoError?.code === 1
          ? `No diste permiso para usar tu ubicación. Mostrando ${DEFAULT_CITY}.`
          : `No pude acceder a tu ubicación. Mostrando ${DEFAULT_CITY}.`;

      try {
        const bundle = await fetchWeatherBundleByCity(DEFAULT_CITY);
        setWeather(bundle.weather);
        setForecast(bundle.forecast);
        setAirQuality(bundle.airQuality);
        setNotice(fallbackMessage);
        setRecentCities((currentCities) =>
          mergeRecentCities(bundle.weather, currentCities),
        );
      } catch (requestError) {
        setError(getWeatherErrorMessage(requestError));
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const getPosition = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, GEO_OPTIONS);
      });

    const loadInitialWeather = async () => {
      setIsLoading(true);
      setError("");
      setNotice("");

      try {
        if (!navigator.geolocation) {
          throw new Error("unsupported");
        }

        const position = await getPosition();
        const bundle = await fetchWeatherBundleByCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        if (ignore) {
          return;
        }

        setWeather(bundle.weather);
        setForecast(bundle.forecast);
        setAirQuality(bundle.airQuality);
        setRecentCities((currentCities) =>
          mergeRecentCities(bundle.weather, currentCities),
        );
      } catch (geoError) {
        const fallbackMessage =
          geoError?.code === 1
            ? `No diste permiso para usar tu ubicación. Mostrando ${DEFAULT_CITY}.`
            : `No pude acceder a tu ubicación. Mostrando ${DEFAULT_CITY}.`;

        try {
          const bundle = await fetchWeatherBundleByCity(DEFAULT_CITY);

          if (ignore) {
            return;
          }

          setWeather(bundle.weather);
          setForecast(bundle.forecast);
          setAirQuality(bundle.airQuality);
          setNotice(fallbackMessage);
          setRecentCities((currentCities) =>
            mergeRecentCities(bundle.weather, currentCities),
          );
        } catch (requestError) {
          if (ignore) {
            return;
          }

          setError(getWeatherErrorMessage(requestError));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadInitialWeather();

    return () => {
      ignore = true;
    };
  }, [setRecentCities]);

  return {
    weather,
    forecast,
    airQuality,
    isLoading,
    isRefreshing,
    error,
    notice,
    recentCities,
    searchByCity,
    loadCurrentLocation,
  };
}
