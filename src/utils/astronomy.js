export const getSunProgress = (currentTime, sunrise, sunset) => {
  const daylightDuration = Math.max(sunset - sunrise, 1);
  const rawProgress = ((currentTime - sunrise) / daylightDuration) * 100;

  return Math.max(0, Math.min(100, rawProgress));
};

export const getSunPhaseMessage = (currentTime, sunrise, sunset) => {
  if (currentTime < sunrise) {
    return "El amanecer aún no comienza en esta ubicación.";
  }

  if (currentTime > sunset) {
    return "La fase solar terminó y el cielo ya entró en tramo nocturno.";
  }

  return `${Math.round(getSunProgress(currentTime, sunrise, sunset))}% del recorrido solar completado.`;
};
