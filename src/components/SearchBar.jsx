import { useState } from "react";
import RecentCities from "./RecentCities";
import "./SearchBar.css";
import UnitToggle from "./UnitToggle";

const SearchBar = ({
  isLoading,
  onLocate,
  onSearch,
  onSelectRecent,
  onUnitChange,
  recentCities,
  unit,
}) => {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return;
    }

    onSearch(trimmedCity);
    setCity("");
  };

  return (
    <form className="search-bar panel" onSubmit={handleSubmit}>
      <div className="search-bar__top">
        <div>
          <span className="search-bar__eyebrow">Explora el clima</span>
          <p className="search-bar__caption">
            Busca una ciudad, cambia unidades o vuelve a tu ubicación actual.
          </p>
        </div>

        <UnitToggle onChange={onUnitChange} unit={unit} />
      </div>

      <label className="search-bar__field" htmlFor="city-search">
        <input
          id="city-search"
          autoComplete="off"
          className="search-bar__input"
          disabled={isLoading}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Bogota, Medellin, Madrid..."
          type="text"
          value={city}
        />
      </label>

      <div className="search-bar__actions">
        <button
          className="search-bar__button search-bar__button--primary"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
        <button
          className="search-bar__button search-bar__button--ghost"
          disabled={isLoading}
          onClick={onLocate}
          type="button"
        >
          Mi ubicación
        </button>
      </div>

      <RecentCities
        cities={recentCities}
        isLoading={isLoading}
        onSelect={onSelectRecent}
      />
    </form>
  );
};

export default SearchBar;
