import React from "react";

const Weathercard = ({ weather, unit }) => {
  if (!weather) return null;

  const getDateTime = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white backdrop-blur-lg border border-amber-400 rounded-2xl shadow-lg p-6 w-80 mx-auto text-center mt-6">
      {/* City Name */}
      <h2 className="text-2xl font-bold">
        {weather.name}, {weather.sys.country}
      </h2>

      {/* Date & Time */}
      <p className="text-gray-500 text-sm mt-1">
        {getDateTime()}
      </p>

      {/* Weather Icon */}
      <div className="flex justify-center mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="w-20 h-20"
        />
      </div>

      {/* Temperature */}
      <p className="text-4xl font-semibold mt-2 py-4">
        {Math.round(weather.main.temp)}°
        {unit === "metric" ? "C" : "F"}
      </p>

      {/* Sky Condition */}
      <p className="text-lg font-medium text-gray-600 mt-1">
        {weather.weather[0].description}
      </p>
    </div>
  );
};

export default Weathercard;
