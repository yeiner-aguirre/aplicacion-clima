import "./SunCyclePanel.css";
import { getSunPhaseMessage, getSunProgress } from "../utils/astronomy";
import { formatLocalDate } from "../utils/formatters";

const SunCyclePanel = ({ weather }) => {
  const progress = getSunProgress(
    weather.dt,
    weather.sys.sunrise,
    weather.sys.sunset,
  );
  const sunMessage = getSunPhaseMessage(
    weather.dt,
    weather.sys.sunrise,
    weather.sys.sunset,
  );

  return (
    <section className="sun-cycle panel">
      <header className="sun-cycle__header">
        <div>
          <span className="sun-cycle__eyebrow">Ciclo solar</span>
          <h2>Amanecer y atardecer</h2>
        </div>
        <strong>{Math.round(progress)}%</strong>
      </header>

      <p className="sun-cycle__message">{sunMessage}</p>

      <div className="sun-cycle__track">
        <div className="sun-cycle__line" />
        <div className="sun-cycle__line sun-cycle__line--fill" style={{ width: `${progress}%` }} />
        <span className="sun-cycle__indicator" style={{ left: `calc(${progress}% - 14px)` }} />
      </div>

      <div className="sun-cycle__times">
        <article className="sun-cycle__time-card">
          <span>Amanecer</span>
          <strong>
            {formatLocalDate(weather.sys.sunrise, weather.timezone, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </strong>
        </article>
        <article className="sun-cycle__time-card">
          <span>Atardecer</span>
          <strong>
            {formatLocalDate(weather.sys.sunset, weather.timezone, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </strong>
        </article>
      </div>
    </section>
  );
};

export default SunCyclePanel;
