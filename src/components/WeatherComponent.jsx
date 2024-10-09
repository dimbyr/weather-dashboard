import React, { useState, useEffect } from 'react';

const WeatherComponent = (coord) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey =  import.meta.env.VITE_WEATHER_API_KEY; // load the API key from .env file
    const metric = 'metric';
    const fetchWeatherData = () => {
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
        console.error(`Fetching error:  ${error}`);
        setLoading(false);
      });
    };

    fetchWeatherData();

    const interval = setInterval(() => {
    fetchWeatherData();
    },
    60000); // Refetch every 60seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  , [coord.lat, coord.lon]);

  if (loading) return <div className='italic'>Loading...</div>;
  if (error) return <div className='italic'>Error: {error.message}</div>;

  // Loading the weather condition icon/
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div>
      {weatherData && (
        <div className="container mx-auto px-4 py-8">
          <h1>Weather in  {weatherData.name}</h1>
          <div className='flex flex-row justify-center items-center p-5'>
            <img src={iconUrl} alt="icon" className='w-40 h-40 mb-4' /> 
            <p className="text-2xl font-semibold text-gray-400">{weatherData.weather[0].description}</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:justify-between md:items-center md:gap-20">
            <br /> {/* This removes misalignment between the .weatherDatas */}
            
            <div className="weatherData">
              <p className='weatherDataTitle'>Temperature<span className="md:hidden">:</span> </p> <p className='weatherDataValue'> {weatherData.main.temp} &deg;C</p>
            </div>
            <div className="weatherData">
              <p className='weatherDataTitle'>Humidity<span className="md:hidden">:</span> </p> <p className='weatherDataValue'>{weatherData.main.humidity}%</p>
            </div>
            <div className="weatherData">
              <p className='weatherDataTitle'>Wind speed<span className="md:hidden">:</span> </p> <p className='weatherDataValue'>{(parseFloat(weatherData.wind.speed)*3.6).toFixed(2)} Km/h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
