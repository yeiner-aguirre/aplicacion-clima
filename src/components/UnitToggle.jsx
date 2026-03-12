import "./UnitToggle.css";

const UNIT_OPTIONS = [
  { label: "°C", value: "metric" },
  { label: "°F", value: "imperial" },
];

const UnitToggle = ({ onChange, unit }) => (
  <div className="unit-toggle" role="group" aria-label="Cambiar unidades de temperatura">
    {UNIT_OPTIONS.map((option) => (
      <button
        className={`unit-toggle__button ${
          unit === option.value ? "unit-toggle__button--active" : ""
        }`}
        key={option.value}
        onClick={() => onChange(option.value)}
        type="button"
      >
        {option.label}
      </button>
    ))}
  </div>
);

export default UnitToggle;
