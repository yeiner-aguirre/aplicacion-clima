import "./App.css";
import AirQualityPanel from "./components/AirQualityPanel";
import CurrentWeatherPanel from "./components/CurrentWeatherPanel";
import DynamicBackground from "./components/DynamicBackground";
import ForecastPanel from "./components/ForecastPanel";
import HighlightsPanel from "./components/HighlightsPanel";
import SearchBar from "./components/SearchBar";
import StatusView from "./components/StatusView";
import SunCyclePanel from "./components/SunCyclePanel";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useWeatherData } from "./hooks/useWeatherData";
import { buildDailyForecast, buildHourlyForecast } from "./utils/forecast";
import { getWeatherTheme } from "./utils/weatherTheme";

function App() {
  const {
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
  } = useWeatherData();
  const [unit, setUnit] = useLocalStorageState("weather-studio-unit", "metric");

  const theme = getWeatherTheme(weather);
  const dailyForecast =
    weather && forecast
      ? buildDailyForecast(forecast.list, forecast.city.timezone, weather.dt)
      : [];
  const hourlyForecast = forecast
    ? buildHourlyForecast(forecast.list, forecast.city.timezone)
    : [];

  return (
    <div className={`app ${theme.className}`}>
      <DynamicBackground scene={theme.scene} />
      <div className="app__backdrop" />

      <main className="app__shell">
        <header className="app__hero">
          <div className="app__intro">
            <span className="app__kicker">Weather Studio</span>
            <h1>Clima vivo, cinematografico y con mucha mas presencia.</h1>
            <p>
              Una experiencia atmosferica con datos utiles, composicion premium y
              escenas que reaccionan al cielo en tiempo real.
            </p>

            <div className="app__feature-strip">
              <span>Escenas fluidas</span>
              <span>5 dias + horas</span>
              <span>AQI en vivo</span>
              <span>Recientes</span>
            </div>
          </div>

          <SearchBar
            isLoading={isLoading || isRefreshing}
            onLocate={loadCurrentLocation}
            onSelectRecent={searchByCity}
            onSearch={searchByCity}
            onUnitChange={setUnit}
            recentCities={recentCities}
            unit={unit}
          />
        </header>

        {notice ? <div className="app__banner app__banner--notice">{notice}</div> : null}
        {error ? <div className="app__banner app__banner--error">{error}</div> : null}

        {isLoading && !weather ? (
          <StatusView
            title="Cargando el panorama climatico"
            message="Estamos consultando tu ubicacion y preparando el clima actual junto con el pronostico."
          />
        ) : null}

        {!isLoading && !weather ? (
          <StatusView
            title="No hay datos disponibles"
            message="No fue posible cargar el clima ahora mismo. Puedes intentar de nuevo con tu ubicacion o buscar una ciudad."
          />
        ) : null}

        {weather ? (
          <section className="app__grid">
            <div className="app__primary">
              <CurrentWeatherPanel
                isRefreshing={isRefreshing}
                theme={theme}
                unit={unit}
                weather={weather}
              />
              <SunCyclePanel weather={weather} />
            </div>

            <div className="app__stack">
              <ForecastPanel
                dailyForecast={dailyForecast}
                hourlyForecast={hourlyForecast}
                unit={unit}
              />
              <div className="app__insights">
                <HighlightsPanel unit={unit} weather={weather} />
                <AirQualityPanel airQuality={airQuality} />
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

export default App;
