import React from "react";
import { StyledWeather, WeatherPreview, CheckboxParent } from "./style";
import { TextField } from "@material-ui/core";
import { useStore } from "react-hookstore";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { defaultWeatherSettings } from "../../widgets/Weather/defaultSettings";
import { WeatherIcon, WeatherWidget } from "../../widgets/Weather/style";

const WeatherFailed = () => (
    <p>Failed to get weather.</p>
)

const WeatherLoading = () => (
    <p>Loading...</p>
)

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

    const onWeatherChange = (type: number, newValue: string) => {
        if(type == 0) setSettings({ ...settings, city: newValue })
        else setSettings({ ...settings, country: newValue })
    }

    return (
        <StyledWeather style={{ paddingRight: "50px" }}>
            <WeatherPreview>
                <WeatherWidget>
                    {(!data) && <WeatherLoading />}
                    {(data && !data.main) && <WeatherFailed />}
                    {(data && data.main) && (
                        <>
                            <WeatherIcon icon={require("../../assets/weather/cloud.svg")} />
                            <h1>{data ? Math.floor(data.main.temp - 273.15) : 0}°C </h1>
                            <p>{settings.city}, {settings.country}</p>
                        </>
                    )}
                </WeatherWidget>
            </WeatherPreview>

            <CheckboxParent>
                <span>City</span>
                <TextField
                    value={settings.city}
                    variant="outlined"
                    size="small"
                    onChange={(e: any) => onWeatherChange(0, e.target.value)}
                />
            </CheckboxParent>

            <CheckboxParent>
                <span>Country</span>
                <TextField
                    value={settings.country}
                    variant="outlined"
                    size="small"
                    onChange={(e: any) => onWeatherChange(1, e.target.value)}
                />
            </CheckboxParent>
        </StyledWeather>
    )
}