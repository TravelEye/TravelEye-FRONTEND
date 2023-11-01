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
import { loadChecklistAPI, updateChecklistAPI } from "../../apis";
import { ItemContainer } from "../CheckList/style";
import Item from "../CheckList/Item";
function MainPage() {
  const [weather, setWeather] = useState({
    description: "",
    temp: "",
    icon: "",
  });
  const data = [
    { id: 0, title: "선택 1", completed: true },
    { id: 1, title: "선택 2", completed: false },
    { id: 2, title: "선택 3", completed: true },
    { id: 3, title: "선택 4", completed: false },
  ];
  const [user, setUser] = useState("김지은");
  const [city, setCity] = useState("Seoul");
  const [todos, setTodos] = useState(data);
  const handleClick = (id, title, completed) => {
    updateChecklistAPI(id, title, !completed);
  };
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}`
        );
        const data = await response.json();
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const checklist = await loadChecklistAPI();
        console.log(checklist);
        setTodos(checklist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <MainPageContainer>
      <UserContainer>{user}님</UserContainer>
      {weather && (
        <WeatherContainer>
          <WeatherBackgroundWrapper type={weather.description}>
            <TemperatureTextWrapper>{weather.temp}°C</TemperatureTextWrapper>
            <CityTextWrapper>{city}</CityTextWrapper>
            <img src={weather.icon} />
          </WeatherBackgroundWrapper>
        </WeatherContainer>
      )}
      <ChecklistContainer>
        {todos.map(({ id, title, completed }) => (
          <ItemContainer key={id}>
            <Item
              id={id}
              todo={title}
              completed={completed}
              onClick={() => handleClick(id, title, completed)}
            />
          </ItemContainer>
        ))}
      </ChecklistContainer>
      <FoodlistContainer>Foodlist</FoodlistContainer>
    </MainPageContainer>
  );
}

export default MainPage;
