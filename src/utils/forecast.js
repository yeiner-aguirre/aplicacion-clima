import { capitalizeText, formatLocalDate } from "./formatters";

const getDateKey = (unixSeconds, timezoneOffset) => {
  const shiftedDate = new Date((unixSeconds + timezoneOffset) * 1000);

  return [
    shiftedDate.getUTCFullYear(),
    String(shiftedDate.getUTCMonth() + 1).padStart(2, "0"),
    String(shiftedDate.getUTCDate()).padStart(2, "0"),
  ].join("-");
};

const getLocalHour = (unixSeconds, timezoneOffset) => {
  const shiftedDate = new Date((unixSeconds + timezoneOffset) * 1000);
  return shiftedDate.getUTCHours();
};

const getRepresentativeEntry = (entries, timezoneOffset) =>
  entries.reduce((closestEntry, entry) => {
    const currentGap = Math.abs(getLocalHour(entry.dt, timezoneOffset) - 13);
    const closestGap = Math.abs(
      getLocalHour(closestEntry.dt, timezoneOffset) - 13,
    );

    return currentGap < closestGap ? entry : closestEntry;
  }, entries[0]);

export const buildDailyForecast = (
  list = [],
  timezoneOffset = 0,
  currentTimestamp = 0,
) => {
  const currentDateKey = getDateKey(currentTimestamp, timezoneOffset);
  const dailyGroups = new Map();

  list.forEach((entry) => {
    const dateKey = getDateKey(entry.dt, timezoneOffset);

    if (dateKey === currentDateKey) {
      return;
    }

    const existingEntries = dailyGroups.get(dateKey) || [];
    dailyGroups.set(dateKey, [...existingEntries, entry]);
  });

  return [...dailyGroups.values()].slice(0, 5).map((entries) => {
    const referenceEntry = getRepresentativeEntry(entries, timezoneOffset);
    const temperatures = entries.map((entry) => entry.main.temp);

    return {
      key: getDateKey(referenceEntry.dt, timezoneOffset),
      label: capitalizeText(
        formatLocalDate(referenceEntry.dt, timezoneOffset, {
          weekday: "long",
        }),
      ),
      shortLabel: capitalizeText(
        formatLocalDate(referenceEntry.dt, timezoneOffset, {
          weekday: "short",
        }),
      ),
      description: capitalizeText(referenceEntry.weather[0].description),
      icon: referenceEntry.weather[0].icon,
      tempMin: Math.min(...temperatures),
      tempMax: Math.max(...temperatures),
      precipitationChance: Math.max(
        ...entries.map((entry) => Math.round((entry.pop || 0) * 100)),
      ),
    };
  });
};

export const buildHourlyForecast = (
  list = [],
  timezoneOffset = 0,
  count = 8,
) =>
  list.slice(0, count).map((entry) => ({
    key: entry.dt,
    label: formatLocalDate(entry.dt, timezoneOffset, {
      hour: "2-digit",
      minute: "2-digit",
    }),
    icon: entry.weather[0].icon,
    temperature: entry.main.temp,
    precipitationChance: Math.round((entry.pop || 0) * 100),
  }));
