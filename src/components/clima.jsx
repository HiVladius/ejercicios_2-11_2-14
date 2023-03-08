import React, { useState, useEffect } from "react";

function WeatherStatus({ country }) {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (country) {
      fetch(
        `https://api.weatherstack.com/current?access_key=89a6ef74a41f166ba1a30a458a921531&query=${country.capital}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.error.info);
            setWeatherData(null);
          } else {
            setWeatherData(data.current);
            setErrorMessage("");
          }
        })
        .catch((error) => {
          setErrorMessage("Error al cargar el estado del clima");
          setWeatherData(null);
        });
    }
  }, [country]);

  if (!country) {
    return null;
  }

  return (
    <div>
      <h3>Estado del clima en {country.capital}</h3>
      {weatherData ? (
        <div>
          <p>Temperatura: {weatherData.temperature} °C</p>
          <p>Descripción: {weatherData.weather_descriptions[0]}</p>
          <p>Velocidad del viento: {weatherData.wind_speed} km/h</p>
          <p>Humedad: {weatherData.humidity}%</p>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
}

export default WeatherStatus;
