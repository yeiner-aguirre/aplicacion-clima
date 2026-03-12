import "./CurrentWeatherPanel.css";
import {
  capitalizeText,
  formatLocalDateTime,
  formatPercentage,
  formatSpeed,
  formatTemperature,
  getUnitLabel,
} from "../utils/formatters";

const CurrentWeatherPanel = ({ isRefreshing, theme, unit, weather }) => {
  const condition = weather.weather[0];

  return (
    <section className="current-weather panel">
      <div className="current-weather__glow" />

      <header className="current-weather__header">
        <div>
          <span className="current-weather__eyebrow">{theme.label}</span>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="current-weather__timestamp">
            {formatLocalDateTime(weather.dt, weather.timezone)}
          </p>
        </div>

        <div className="current-weather__state">
          {isRefreshing ? (
            <span className="current-weather__refresh">Actualizando...</span>
          ) : null}
          <span className="current-weather__badge">
            {capitalizeText(condition.description)}
          </span>
        </div>
      </header>

      <div className="current-weather__hero">
        <div className="current-weather__visual">
          <div className="current-weather__icon-shell">
            <img
              alt={condition.description}
              className="current-weather__icon"
              src={`https://openweathermap.org/img/wn/${condition.icon}@4x.png`}
            />
          </div>
        </div>

        <div className="current-weather__temperature-column">
          <span className="current-weather__unit-label">
            Unidad activa {getUnitLabel(unit)}
          </span>
          <div className="current-weather__temperature">
            {formatTemperature(weather.main.temp, unit, { withUnit: true })}
          </div>
          <p className="current-weather__feels-like">
            Sensacion termica{" "}
            {formatTemperature(weather.main.feels_like, unit, {
              withUnit: true,
            })}
          </p>
        </div>

        <p className="current-weather__summary">{theme.summary}</p>
      </div>

      <div className="current-weather__chips">
        <div className="current-weather__chip">
          <span>Maxima</span>
          <strong>{formatTemperature(weather.main.temp_max, unit)}</strong>
        </div>
        <div className="current-weather__chip">
          <span>Minima</span>
          <strong>{formatTemperature(weather.main.temp_min, unit)}</strong>
        </div>
        <div className="current-weather__chip">
          <span>Humedad</span>
          <strong>{formatPercentage(weather.main.humidity)}</strong>
        </div>
        <div className="current-weather__chip">
          <span>Viento</span>
          <strong>{formatSpeed(weather.wind.speed, unit)}</strong>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeatherPanel;
