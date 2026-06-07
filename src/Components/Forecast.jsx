import React from "react";

const Forecast = ({ forecast, unit }) => {
  if (!forecast || forecast.length === 0) return null;

  const getDay = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <div className="flex justify-center gap-4 mt-6 flex-wrap">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-4 w-24 text-center"
        >
          <p className="font-semibold">{getDay(day.dt_txt)}</p>

          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt="icon"
            className="mx-auto"
          />

          <p className="font-bold">
            {Math.round(day.main.temp)}°
            {unit === "metric" ? "C" : "F"}
          </p>

          <p className="text-xs text-gray-500">
            {day.weather[0].main}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
