import React from "react";
import useLocalStorage from 'use-local-storage-state'
import { WeatherIcon, WeatherWidget } from "./style";
import useSWR from 'swr'
import { fetcher } from "../../utils/fetcher";

export const Weather = () => {
    const [weatherSettings, setWeatherSettings] = useLocalStorage('widgets.weather.settings', { position: "bottom-left", city: "London", country: "England" });

    const { data } = useSWR(
        `https://compass-api.vercel.app/weather/${weatherSettings.city},${weatherSettings.country}`, 
        fetcher
    )

    if (!data) return <></>

    return (
        <WeatherWidget className={weatherSettings.position}>
            <WeatherIcon icon={require("../../assets/weather/cloud.svg")} />
            <h1>{Math.floor(data.main.temp - 273.15)}°C </h1>
            <p>{weatherSettings.city}, {weatherSettings.country}</p>
        </WeatherWidget>
    )
}