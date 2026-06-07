import React from "react";

const Navbar = ({ city, setCity, fetchWeather }) => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-slate-50">
      <h1 className="text-2xl font-bold text-black">Weather Forecast</h1>

      <div className="flex">
        <input
          type="text"
          placeholder="Search City..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          className="px-3 py-2 rounded-l-md outline-none text-black border-2 border-gray-300"
        />
        <button
          onClick={fetchWeather}
          className="bg-yellow-400 px-4 py-2 rounded-r-md font-semibold hover:bg-yellow-500 cursor-pointer"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
