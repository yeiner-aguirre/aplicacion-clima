import "./RecentCities.css";

const RecentCities = ({ cities, isLoading, onSelect }) => {
  if (!cities.length) {
    return null;
  }

  return (
    <div className="recent-cities">
      <span className="recent-cities__label">Recientes</span>

      <div className="recent-cities__list">
        {cities.map((city) => (
          <button
            className="recent-cities__chip"
            disabled={isLoading}
            key={city.query}
            onClick={() => onSelect(city.query)}
            type="button"
          >
            {city.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentCities;
