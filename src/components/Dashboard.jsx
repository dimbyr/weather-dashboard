import WeatherComponent from "./WeatherComponent";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const geoCoords = { lat: -18.32, lon: 47.17 }; // A default value for coordinates.
  // Check for saved coordinates in local storage
  const storedLat = localStorage.getItem('lat');
  const storedLon = localStorage.getItem('lon');

  if(storedLat && storedLon){
    geoCoords.lat = parseFloat(storedLat);

    geoCoords.lon = parseFloat(storedLon);
  } 

  const [city, setCity] = useState(''); // Store city name, handling the form
  const [coord, setCoord] = useState(geoCoords); // Store lat and lon
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use effect to fetch coordinates based on the city when it changes
  useEffect(() => {
    if (city) {
      const apiKey =  import.meta.env.VITE_WEATHER_API_KEY; // import API Key from .env file
      // Geocoding API
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      setLoading(true);
      setError(null);
      
      // Fetch coordinates for the city
      
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response for city search was not ok, Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            setCoord({ lat, lon });
            // Store coordinates for later use
            localStorage.setItem('lat',lat);
            localStorage.setItem('lon', lon);
          } else {
            setError('City not found, please check!');
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [city]); // This effect runs whenever the city name changes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    const cityName = e.target.elements.citysearch.value; // Get the city name from the input
    setCity(cityName); // Set the city name to trigger the useEffect
  };

  return (
    <div className="flex flex-col justify-between items-center sm:w-screen sm:p-2">
      <form onSubmit={handleSubmit} className="h-10 w-50 m-3 flex flex-row justify-center">
        <input
          className="input border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
          type="text"
          name="citysearch"
          placeholder="search a city"
        />
        <button className="p-4 bg-blue-500 rounded-md hover:bg-blue-700 text-white" type="submit">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
              fill="#49454F"
            />
          </svg>
        </button>
      </form>
      {loading && <div>Searching...</div>}
      {error && <div>Error: {error.message || error}</div>}

      {!loading && !error && (
        <WeatherComponent lat={coord.lat} lon={coord.lon} />
      )}
    </div>
  );
}
