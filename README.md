# Weather Studio

Aplicación del clima construida con React + Vite, rediseñada para ofrecer una experiencia más visual, dinámica y escalable.

## Qué incluye

- Fondo dinámico que cambia según el clima: cielo despejado, noche, nubes, lluvia, tormenta, nieve y bruma.
- Pronóstico extendido para próximos días.
- Vista horaria resumida para las próximas horas.
- Métricas útiles: sensación térmica, humedad, viento, presión, visibilidad, amanecer y atardecer.
- Diseño responsive para escritorio, tablets y móviles.
- Arquitectura separada por servicios, hooks, utilidades y componentes.

## Estructura

- `src/services`: integración con OpenWeather.
- `src/hooks`: lógica de carga, geolocalización y búsqueda.
- `src/utils`: formateo, pronóstico y theming climático.
- `src/components`: paneles de UI y fondo animado.

## Configuración

1. Copia `.env.example` a `.env`.
2. Define tu clave en `VITE_OPENWEATHER_API_KEY`.
3. Instala dependencias con `npm install`.
4. Ejecuta `npm run dev`.

## Scripts

- `npm run dev`: entorno local.
- `npm run build`: build de producción.
- `npm run lint`: validación con ESLint.
