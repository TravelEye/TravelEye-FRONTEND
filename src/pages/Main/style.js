import styled from "styled-components";
export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const WeatherContainer = styled.div`
  width: 50vw;
  border: 1px solid black;
  text-align: center;
  font-size: 30px;
`;

export const TemperatureTextWrapper = styled.span`
  font-size: 80px;
  letter-spacing: -7px;
  margin-right: 15px;
`;
export const CityTextWrapper = styled.span``;
export const ChecklistContainer = styled.div``;
export const FoodlistContainer = styled.div``;
export const UserContainer = styled.div``;
export const WeatherBackgroundWrapper = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => {
    switch (props.type) {
      case "Clear":
        return "https://source.unsplash.com/PEm_sLmJT-w/1600x900"; // Clear
      case "Clouds":
        return "https://source.unsplash.com/78wDBw9ajUk/1600x900"; // Clouds
      case "Thunderstorm":
        return "https://source.unsplash.com/jh2KTqHJLMjE/1600x900"; // Thunderstorm
      case "Rain":
        return "https://source.unsplash.com/22x7fxFpl_8/1600x900"; // Rain
      case "Snow":
        return "https://images.unsplash.com/photo-1547754980-3df97fed72a8?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/1600x900"; // Snow
      default:
        return "https://source.unsplash.com/v9bnfMCyKbg/1600x900"; // Default
    }
  }});
`;
