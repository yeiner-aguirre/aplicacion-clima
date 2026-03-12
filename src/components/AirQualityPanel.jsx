import "./AirQualityPanel.css";
import { getAirQualityMeta } from "../utils/airQuality";

const AirQualityPanel = ({ airQuality }) => {
  const currentAir = airQuality?.list?.[0];

  if (!currentAir) {
    return (
      <section className="air-quality air-quality--neutral panel">
        <header className="air-quality__header">
          <span className="air-quality__eyebrow">Calidad del aire</span>
          <h2>Sin lectura disponible</h2>
        </header>

        <p className="air-quality__description">
          OpenWeather no devolvio datos de particulas para esta consulta.
        </p>
      </section>
    );
  }

  const meta = getAirQualityMeta(currentAir.main.aqi);
  const pollutants = [
    { label: "PM2.5", value: `${Math.round(currentAir.components.pm2_5)} ug/m3` },
    { label: "PM10", value: `${Math.round(currentAir.components.pm10)} ug/m3` },
    { label: "NO2", value: `${Math.round(currentAir.components.no2)} ug/m3` },
    { label: "O3", value: `${Math.round(currentAir.components.o3)} ug/m3` },
  ];

  return (
    <section className={`air-quality air-quality--${meta.tone} panel`}>
      <header className="air-quality__header">
        <div>
          <span className="air-quality__eyebrow">Calidad del aire</span>
          <h2>{meta.label}</h2>
        </div>

        <div className="air-quality__score">
          <strong>{currentAir.main.aqi}</strong>
          <span>/ 5</span>
        </div>
      </header>

      <p className="air-quality__description">{meta.description}</p>

      <div className="air-quality__grid">
        {pollutants.map((item) => (
          <article className="air-quality__card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AirQualityPanel;
