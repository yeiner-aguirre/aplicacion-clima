const AIR_QUALITY_LEVELS = {
  1: {
    label: "Excelente",
    description: "Aire limpio y cómodo para la mayoría de personas.",
    tone: "good",
  },
  2: {
    label: "Buena",
    description: "La calidad del aire sigue siendo estable y saludable.",
    tone: "good",
  },
  3: {
    label: "Moderada",
    description: "Puede afectar a personas sensibles si se prolonga la exposición.",
    tone: "moderate",
  },
  4: {
    label: "Baja",
    description: "Conviene reducir actividad intensa al aire libre.",
    tone: "poor",
  },
  5: {
    label: "Muy baja",
    description: "Condición desfavorable para exposición prolongada en exteriores.",
    tone: "poor",
  },
};

export const getAirQualityMeta = (aqi = 0) =>
  AIR_QUALITY_LEVELS[aqi] || {
    label: "Sin datos",
    description: "No se pudo determinar la calidad del aire actual.",
    tone: "neutral",
  };
