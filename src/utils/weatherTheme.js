export const DEFAULT_THEME = {
  className: "theme-clear-day",
  scene: "clear-day",
  label: "Clima en vivo",
  summary: "Una vista central del estado actual del cielo y la sensación térmica.",
};

const THEMES = {
  "clear-day": {
    className: "theme-clear-day",
    scene: "clear-day",
    label: "Cielo despejado",
    summary:
      "Luz limpia, buena visibilidad y un ambiente ideal para mantener una lectura clara del día.",
  },
  "clear-night": {
    className: "theme-clear-night",
    scene: "clear-night",
    label: "Noche serena",
    summary:
      "El entorno baja de intensidad y deja una lectura más tranquila del clima nocturno.",
  },
  "clouds-day": {
    className: "theme-clouds-day",
    scene: "clouds-day",
    label: "Nubes en movimiento",
    summary:
      "Capas de nubes cruzan la escena y suavizan la luz con un aspecto más atmosférico.",
  },
  "clouds-night": {
    className: "theme-clouds-night",
    scene: "clouds-night",
    label: "Noche cubierta",
    summary:
      "Las nubes toman protagonismo y la escena se vuelve más profunda y contenida.",
  },
  rain: {
    className: "theme-rain",
    scene: "rain",
    label: "Lluvia activa",
    summary:
      "La lluvia cae con movimiento constante para transmitir un entorno húmedo y vivo.",
  },
  storm: {
    className: "theme-storm",
    scene: "storm",
    label: "Tormenta",
    summary:
      "Sombras densas, nubes pesadas y destellos eléctricos marcan una condición más intensa.",
  },
  snow: {
    className: "theme-snow",
    scene: "snow",
    label: "Nevada",
    summary:
      "Copos flotando y una paleta más fría refuerzan la sensación de aire helado.",
  },
  mist: {
    className: "theme-mist",
    scene: "mist",
    label: "Bruma y neblina",
    summary:
      "La escena gana capas difusas y una atmósfera más suave y silenciosa.",
  },
};

export const getWeatherTheme = (weather) => {
  if (!weather?.weather?.length) {
    return DEFAULT_THEME;
  }

  const condition = weather.weather[0];
  const weatherId = condition.id;
  const isDay = condition.icon?.endsWith("d");

  if (weatherId >= 200 && weatherId < 300) {
    return THEMES.storm;
  }

  if (weatherId >= 300 && weatherId < 600) {
    return THEMES.rain;
  }

  if (weatherId >= 600 && weatherId < 700) {
    return THEMES.snow;
  }

  if (weatherId >= 700 && weatherId < 800) {
    return THEMES.mist;
  }

  if (weatherId === 800) {
    return isDay ? THEMES["clear-day"] : THEMES["clear-night"];
  }

  if (weatherId > 800) {
    return isDay ? THEMES["clouds-day"] : THEMES["clouds-night"];
  }

  return DEFAULT_THEME;
};
