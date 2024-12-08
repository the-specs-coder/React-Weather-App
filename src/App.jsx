import "./App.css";
import { CurrentWeather } from "./components/current-weather/current-weather";
import { Search } from "./components/search/search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { FORECAST_API_URL } from "./api";
import { useState } from "react";
import { Forecast } from "./components/forecast/forecast";
function App() {
  //Defining state variables for storing and updating weather and forecast data.
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  function handleOnSearchChange(searchData) {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${FORECAST_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async function (response) {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        //Updates the weather and forecast after fetching the information from the API endpoint.
        //Adds a new object with first property city and the other properties from weatherResponse spread into this object
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

 

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}></Search>
      {currentWeather && (<CurrentWeather data={currentWeather}></CurrentWeather>)}
      {forecast && (<Forecast data={forecast}></Forecast>)}
    </div>
  );
}

export default App;
