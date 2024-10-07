# Weather dashboard

This is a final capstone project from the ALX Front-End Developer Specialization. 

# Weather Dashboard 🌦️

A simple and responsive weather dashboard built with **React**, **Tailwind CSS**, and **OpenWeather API**. It allows users to get real-time weather data, including temperature, humidity, and wind speed, for any location.

## Features
- 🌍 **Current Weather:** Displays weather information such as temperature, humidity, wind speed, and weather conditions for any city.
- 🌑 **Dark/Light Mode Toggle:** Users can switch between dark mode and light mode, with their preference saved in `localStorage`.
- 🖼️ **Weather Icons:** Icons representing the current weather conditions are displayed, sourced from the OpenWeather API.
- 📱 **Responsive Design:** Optimized for different screen sizes, from mobile devices to large desktop screens.
  
## Table of Contents
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Demo
You can see the app live [here](#) (add a link to your live project if it's hosted online).

## Installation
Follow the steps below to get the project up and running locally:

### Prerequisites
- Node.js installed
- A free API key from [OpenWeather API](https://openweathermap.org/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project, and add your OpenWeather API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser to view the app.

## Usage

1. Enter the name of a city in the search bar to get the current weather data.
2. The dashboard displays weather conditions such as temperature, humidity, and wind speed.
3. Toggle between light and dark mode using the button in the interface.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Frontend build tool for a faster development experience. - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- **OpenWeather API**: Provides real-time weather data.
- **localStorage**: Saves user preferences (like dark mode) between sessions.

## Folder Structure

```bash
├── src
│   ├── components
│   │   ├── WeatherComponent.jsx
│   │   ├── ToggleDark.jsx
│   │   ├── Dashboard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public
│   └── index.html
└── package.json
```

## Contributing
Contributions are welcome! If you want to improve or add features to this project, follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

