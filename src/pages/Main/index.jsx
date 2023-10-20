import React, { useEffect, useState } from "react";
import {
  MainPageContainer,
  WeatherContainer,
  ChecklistContainer,
  FoodlistContainer,
  UserContainer,
  TemperatureTextWrapper,
  CityTextWrapper,
  WeatherBackgroundWrapper,
} from "./style";
function MainPage() {
  const [weather, setWeather] = useState({
    description: "",
    temp: "",
    icon: "",
  });
  const [user, setUser] = useState("김지은");
  const [city, setCity] = useState("London");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}`
        );
        const data = await response.json();
        console.log(data.weather[0].main);
        const icon = data.weather[0].icon;
        setWeather({
          description: data.weather[0].main,
          temp: Math.floor(data.main.temp - 273.15),
          icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [city]);
  return (
    <MainPageContainer>
      <div>{user}님</div>
      {weather && (
        <WeatherContainer>
          <WeatherBackgroundWrapper type={weather.description}>
            <TemperatureTextWrapper>{weather.temp}°C</TemperatureTextWrapper>
            <CityTextWrapper>{city}</CityTextWrapper>
            <img src={weather.icon} />
          </WeatherBackgroundWrapper>
          {/* {weather.description} */}
        </WeatherContainer>
      )}
      <ChecklistContainer>Checklist</ChecklistContainer>
      <FoodlistContainer>Foodlist</FoodlistContainer>
    </MainPageContainer>
  );
}

export default MainPage;
