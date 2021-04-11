import React from "react";
import useLocalStorage from "react-use-localstorage";
import { WeatherIcon, WeatherWidget } from "./style";

export const Weather = () => {
    const [weatherSettings, setWeatherSettings] = useLocalStorage('widgets.weather.settings', JSON.stringify({ position: "bottom-left" }));

    return (
        <WeatherWidget className={JSON.parse(weatherSettings).position}>
            <WeatherIcon icon={require("../../assets/weather/cloud.svg")} />
            <h1>13°C</h1>
            <p>London, England</p>
        </WeatherWidget>
    )
}