import "./HighlightsPanel.css";
import {
  formatDistance,
  formatPercentage,
  formatPressure,
  formatSpeed,
  formatTemperature,
} from "../utils/formatters";

const HighlightsPanel = ({ unit, weather }) => {
  const items = [
    {
      label: "Sensacion",
      value: formatTemperature(weather.main.feels_like, unit),
      detail: "Como se percibe la temperatura real en el cuerpo.",
    },
    {
      label: "Humedad",
      value: formatPercentage(weather.main.humidity),
      detail: "Cantidad de vapor de agua presente en el aire.",
    },
    {
      label: "Viento",
      value: formatSpeed(weather.wind.speed, unit),
      detail: `Rafagas hasta ${formatSpeed(weather.wind.gust || weather.wind.speed, unit)}`,
    },
    {
      label: "Nubes",
      value: formatPercentage(weather.clouds.all),
      detail: "Cobertura nubosa actual sobre la ciudad.",
    },
    {
      label: "Visibilidad",
      value: formatDistance(weather.visibility, unit),
      detail: "Distancia horizontal estimada por el servicio.",
    },
    {
      label: "Presion",
      value: formatPressure(weather.main.pressure),
      detail: "Indicador util para cambios de tiempo cercanos.",
    },
  ];

  return (
    <section className="highlights panel">
      <header className="highlights__header">
        <span className="highlights__eyebrow">Detalles utiles</span>
        <h2>Metricas del momento</h2>
      </header>

      <div className="highlights__grid">
        {items.map((item) => (
          <article className="highlights__card" key={item.label}>
            <span className="highlights__label">{item.label}</span>
            <strong className="highlights__value">{item.value}</strong>
            <p className="highlights__detail">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HighlightsPanel;
