// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=b34a8e696ac1487d41c911090a798907
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNav from "./components/MyNav";
import CityDetails from "./components/CityDetails";
import WeatherResult from "./components/WeatherResult";

const App = () => {
  const [weatherResults, setWeatherResults] = useState([]);

  const handleCitySubmit = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b34a8e696ac1487d41c911090a798907`
      );
      const data = await response.json();

      const { coord, main, wind, sys, weather } = data;

      const newResult = {
        city,
        coordinates: coord,
        temperature: main.temp,
        feelsLike: main.feels_like,
        tempMax: main.temp_max,
        tempMin: main.temp_min,
        humidity: main.humidity,
        windSpeed: wind.speed,
        country: sys.country,
        weatherIcon: weather[0].icon,
      };

      setWeatherResults([newResult]);
    } catch (error) {
      console.error("Errore nella richiesta API:", error);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <MyNav onCitySubmit={handleCitySubmit} />
        <Routes>
          <Route path="/" element={<WeatherResult results={weatherResults} />} />
          <Route path="/details/:city" element={<CityDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
