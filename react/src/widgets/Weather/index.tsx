import React from "react";
import { WeatherIcon, WeatherWidget } from "./style";
import useSWR from 'swr'
import { fetcher } from "../../utils/fetcher";
import { defaultWeatherSettings } from "./defaultSettings";
import { useStore } from "react-hookstore";

export const Weather = () => {
    const [settings, setSettings]: [typeof defaultWeatherSettings, any] = useStore('weatherSettings');

    const { data } = useSWR(
        (settings.city && settings.country) ? `https://compass-api.vercel.app/weather/${settings.city},${settings.country}` : ``, 
        fetcher
    )

    React.useEffect(() => {
        window.addEventListener("DOMContentLoaded", () => {
            setSettings(localStorage.getItem("weatherSettings") ? JSON.parse(localStorage.getItem("weatherSettings") || "") : defaultWeatherSettings);
        })
    }, [settings])

    if (!data) return <></>
    if (data && !data.main) return <WeatherWidget className={settings.position}>
        <p>Failed to get weather.</p>
    </WeatherWidget>

    return (
        <WeatherWidget className={settings.position}>
            <WeatherIcon icon={require("../../assets/weather/cloud.svg")} />
            <h1>{Math.floor(data.main.temp - 273.15)}°C </h1>
            <p>{settings.city}, {settings.country}</p>
        </WeatherWidget>
    )
}