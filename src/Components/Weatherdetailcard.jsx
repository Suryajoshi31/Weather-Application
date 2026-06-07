import React from "react"

const WeatherDetailsCard = ({weather, aqi}) =>{
     if(!weather) return null;

     return(
         <div className="bg-white backdrop-blur-lg border border-amber-400 rounded-2xl shadow-lg p-4 w-80 mx-auto mt-4 grid grid-cols-2 gap-2 text-center">
            <div>
        <p className="text-sm text-gray-700">Humidity</p>
        <p className="text-lg font-bold">{weather.main.humidity}%</p>
      </div>

      <div>
        <p className="text-sm text-gray-700">Wind Speed</p>
        <p className="text-lg font-bold">{weather.wind.speed} m/s</p>
      </div>

      <div>
        <p className="text-sm text-gray-700">Pressure</p>
        <p className="text-lg font-bold">{weather.main.pressure} hPa</p>
      </div>

      <div>
        <p className="text-sm text-gray-700">Visibility</p>
        <p className="text-lg font-bold">
          {(weather.visibility / 1000).toFixed(1)} km
        </p>
      </div>

      <div className="col-span-2">
        <p className="text-sm text-gray-700">Air Quality Index</p>
        <p className="text-xl font-bold">
          {aqi ? aqi : "Loading..."}
        </p>
      </div>
         </div>
     )
}
export default WeatherDetailsCard;