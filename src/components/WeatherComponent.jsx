import React, { useState, useEffect } from 'react';

const WeatherComponent = (coord) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey =  import.meta.env.VITE_WEATHER_API_KEY;
    const metric = 'metric';

    // Fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${metric}`)
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
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  return (
    <div>
      {weatherData && (
        <div>
          <h1>Weather in  {weatherData.name}</h1>
          <p className='flex flex-row justify-center items-center'><img src={iconUrl} alt="icon" /> {weatherData.weather[0].description}
          </p>
          <p>Temperature: {weatherData.main.temp} &deg;C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind speed: {(parseFloat(weatherData.wind.speed)*3.6).toFixed(2)} Km/h</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
