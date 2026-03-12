import "./ForecastPanel.css";
import { formatPercentage, formatTemperature } from "../utils/formatters";

const ForecastPanel = ({ dailyForecast, hourlyForecast, unit }) => (
  <section className="forecast panel">
    <header className="forecast__header">
      <div>
        <span className="forecast__eyebrow">Proximos dias</span>
        <h2>Pronostico extendido</h2>
      </div>
      <p>Lectura rapida de la semana y evolucion durante las proximas horas.</p>
    </header>

    <div className="forecast__daily-list">
      {dailyForecast.map((day) => (
        <article className="forecast__daily-card" key={day.key}>
          <div className="forecast__daily-top">
            <div>
              <h3>{day.shortLabel}</h3>
              <p>{day.description}</p>
            </div>
            <img
              alt={day.description}
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            />
          </div>

          <div className="forecast__temperatures">
            <strong>{formatTemperature(day.tempMax, unit)}</strong>
            <span>{formatTemperature(day.tempMin, unit)}</span>
          </div>

          <div className="forecast__precipitation">
            Lluvia {formatPercentage(day.precipitationChance)}
          </div>
        </article>
      ))}
    </div>

    <div className="forecast__timeline">
      {hourlyForecast.map((entry) => (
        <article className="forecast__hour-card" key={entry.key}>
          <span className="forecast__hour-label">{entry.label}</span>
          <img
            alt="Pronostico horario"
            className="forecast__hour-icon"
            src={`https://openweathermap.org/img/wn/${entry.icon}.png`}
          />
          <strong>{formatTemperature(entry.temperature, unit)}</strong>
          <span className="forecast__hour-pop">
            {formatPercentage(entry.precipitationChance)}
          </span>
        </article>
      ))}
    </div>
  </section>
);

export default ForecastPanel;
