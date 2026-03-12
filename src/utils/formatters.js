const LOCALE = "es-ES";

const toShiftedDate = (unixSeconds, timezoneOffset = 0) =>
  new Date((unixSeconds + timezoneOffset) * 1000);

const convertTemperature = (value, unit = "metric") => {
  const numericValue = Number(value ?? 0);
  return unit === "imperial" ? (numericValue * 9) / 5 + 32 : numericValue;
};

const convertSpeed = (value, unit = "metric") => {
  const numericValue = Number(value ?? 0);
  return unit === "imperial" ? numericValue * 2.23694 : numericValue;
};

const convertDistance = (meters, unit = "metric") => {
  const numericValue = Number(meters ?? 0);
  return unit === "imperial" ? numericValue / 1609.344 : numericValue / 1000;
};

export const capitalizeText = (text = "") =>
  text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";

export const formatTemperature = (
  value,
  unit = "metric",
  { withUnit = false } = {},
) => {
  const roundedValue = Math.round(convertTemperature(value, unit));
  const unitLabel = unit === "imperial" ? "°F" : "°C";

  return withUnit ? `${roundedValue}${unitLabel}` : `${roundedValue}°`;
};

export const formatPercentage = (value) =>
  `${Math.round(Number(value ?? 0))}%`;

export const formatPressure = (value) =>
  `${Math.round(Number(value ?? 0))} hPa`;

export const formatSpeed = (value, unit = "metric") => {
  const convertedValue = convertSpeed(value, unit);
  return unit === "imperial"
    ? `${convertedValue.toFixed(1)} mph`
    : `${convertedValue.toFixed(1)} m/s`;
};

export const formatDistance = (meters, unit = "metric") => {
  const convertedValue = convertDistance(meters, unit);
  return unit === "imperial"
    ? `${convertedValue.toFixed(1)} mi`
    : `${convertedValue.toFixed(1)} km`;
};

export const getUnitLabel = (unit = "metric") =>
  unit === "imperial" ? "°F" : "°C";

export const formatLocalDate = (unixSeconds, timezoneOffset, options) =>
  new Intl.DateTimeFormat(LOCALE, {
    ...options,
    timeZone: "UTC",
  }).format(toShiftedDate(unixSeconds, timezoneOffset));

export const formatLocalDateTime = (unixSeconds, timezoneOffset) =>
  capitalizeText(
    formatLocalDate(unixSeconds, timezoneOffset, {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
