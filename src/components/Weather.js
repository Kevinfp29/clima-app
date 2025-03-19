import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = process.env.REACT_APP_API_KEY; // Sustituye con tu clave de API

  // Función para obtener el clima
  const getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === '404') {
          setError('Ciudad no encontrada');
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setError('');
        }
      })
      .catch((err) => {
        setError('No se pudo obtener el clima. Verifica la ciudad o la clave API.');
        setWeatherData(null);
      });
  };

  // Manejar cambios en el input de ciudad
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div>
      <h1>Clima Actual</h1>
      <input
        type="text"
        placeholder="Ingresa una ciudad"
        value={city}
        onChange={handleChange}
      />
      <button onClick={getWeather}>Obtener Clima</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && weatherData.main && weatherData.weather && (
        <div>
          <h2>Ciudad: {weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Descripción: {weatherData.weather[0].description}</p>
          <p>Humedad: {weatherData.main.humidity}%</p>
          <p>Viento: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
