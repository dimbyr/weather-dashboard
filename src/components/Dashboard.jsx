import WeatherComponent from "./WeatherComponent";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [city, setCity] = useState(''); // Store city name
  const [coord, setCoord] = useState({ lat: -18.32, lon: 47.17 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use effect to fetch coordinates based on the city when it changes
  useEffect(() => {
    if (city) {
      const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
      setLoading(true);
      setError(null);

      // Fetch coordinates for the city
      fetch(`${NOMINATIM_URL}?q=${city}&format=json&limit=1`,{
        headers: {
          'User-Agent': 'WeatherDashboardALX/0.8 (drabearivony@gmail.com)', // Use your app name and contact email
          'Accept-Language': 'en' // Optional, helps with localization
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response for city search was not ok, Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setCoord({ lat, lon });
          } else {
            setError('City not found');
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
          className="bg-slate-200 text-gray-700 rounded"
          type="text"
          name="citysearch"
          placeholder="search a city"
        />
        <button className="p-4 bg-slate-50 rounded" type="submit">
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
