import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Weathercard from "./Components/Weathercard";
import Forecast from "./Components/Forecast";
import RainAnimation from "./Components/Rainanimation";
import CloudAnimation from "./Components/Cloudanimation";
import SunAnimation from "./Components/Sunnyanimation";
import WeatherDetailsCard from "./Components/Weatherdetailcard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit] = useState("metric");
  const [error, setError] = useState("");
  const [aqi, setAqi] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Background changer
  const getBackground = (weather) => {
    if (!weather) return "bg-slate-50";
    const condition = weather.weather[0].main;

    switch (condition) {
      case "Clear":
        return "bg-gradient-to-br from-yellow-300 to-blue-400";
      case "Clouds":
        return "bg-gradient-to-br from-gray-400 to-gray-600";
      case "Rain":
        return "bg-gradient-to-br from-blue-600 to-gray-800";
      case "Snow":
        return "bg-gradient-to-br from-white to-blue-200";
      case "Thunderstorm":
        return "bg-gradient-to-br from-gray-800 to-black";
      case "Mist":
      case "Haze":
        return "bg-gradient-to-br from-gray-300 to-gray-500";
      default:
        return "bg-slate-200";
    }
  };

  // Fetch using City name (your existing logic)
  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setError("");

      const res1 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},NP&appid=${API_KEY}&units=${unit}`
      );
      const data1 = await res1.json();

      if (!res1.ok) {
        setError(data1.message || "City not found!");
        return;
      }

      setWeather(data1);

      const { lat, lon } = data1.coord;

      // AQI
      const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const aqiData = await aqiRes.json();
      setAqi(aqiData.list[0].main.aqi);

      // Forecast
      const res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      const data2 = await res2.json();

      const groupedByDate = {};
      data2.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!groupedByDate[date]) groupedByDate[date] = [];
        groupedByDate[date].push(item);
      });

      const dailyForecast = Object.keys(groupedByDate)
        .slice(0, 5)
        .map((date) => {
          const items = groupedByDate[date];
          const noonItem = items.find((i) => i.dt_txt.includes("12:00:00"));
          return noonItem || items[Math.floor(items.length / 2)];
        });

      setForecast(dailyForecast);
    } catch {
      setError("Something went wrong.");
    }
  };

  // NEW: Fetch by current location when app loads
  const fetchWeatherByLocation = async (lat, lon) => {
    try {
      setError("");

      const res1 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      const data1 = await res1.json();
      setWeather(data1);

      // AQI
      const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const aqiData = await aqiRes.json();
      setAqi(aqiData.list[0].main.aqi);

      // Forecast
      const res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      const data2 = await res2.json();

      const groupedByDate = {};
      data2.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!groupedByDate[date]) groupedByDate[date] = [];
        groupedByDate[date].push(item);
      });

      const dailyForecast = Object.keys(groupedByDate)
        .slice(0, 5)
        .map((date) => {
          const items = groupedByDate[date];
          const noonItem = items.find((i) => i.dt_txt.includes("12:00:00"));
          return noonItem || items[Math.floor(items.length / 2)];
        });

      setForecast(dailyForecast);
    } catch {
      setError("Location weather not available.");
    }
  };

  // Auto run when app loads
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      () => {
        setError("Location permission denied. Search manually.");
      }
    );
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 min-h-screen 
      ${getBackground(weather)} transition-all duration-700`}
    >
      {/* Animations */}
      {weather && weather.weather[0].main === "Rain" && <RainAnimation />}
      {weather && weather.weather[0].main === "Clouds" && <CloudAnimation />}
      {weather && weather.weather[0].main === "Clear" && <SunAnimation />}

      <Navbar city={city} setCity={setCity} fetchWeather={fetchWeather} />

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Cards Row */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-1 mt-6">
        <Weathercard weather={weather} unit={unit} />
        <WeatherDetailsCard weather={weather} aqi={aqi} />
      </div>

      {/* Forecast below */}
      <div className="py-4">
      <Forecast forecast={forecast} unit={unit} />
      </div>
    </div>
  );
}

export default App;
