import React, { useState, useEffect } from 'react';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'your_api_key_here' with your actual OpenWeatherMap API key
    const apiKey =  import.meta.env.VITE_WEATHER_API_KEY;
    const lat = 54.34;
    const lon = 15.99;
    const metric = 'metric';

    // Fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${metric}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Weather Data</h1>
      {weatherData && (
        <div>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp} &deg;C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
