import React from "react";
import { StyledWeather, WeatherPreview, CheckboxParent } from "./style";
import { TextField } from "@material-ui/core";
import { useStore } from "react-hookstore";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { defaultWeatherSettings } from "../../widgets/Weather/defaultSettings";
import { WeatherIcon, WeatherWidget } from "../../widgets/Weather/style";
import { countryCodes } from "../../utils/countries";

const WeatherFailed = () => (
    <p>Failed to get weather.</p>
)

const WeatherLoading = () => (
    <p>Loading...</p>
)

const WeatherNotSetup = () => (
    <>
        <WeatherIcon icon={require("../../assets/weather/cloud.svg")} />
        <h1>-</h1>
        <p>Weather not set-up yet.</p>
    </>
)

export const Weather = () => {
    const [settings, setSettings]: [typeof defaultWeatherSettings, any] = useStore('weatherSettings');
    const [ready, setReady] = React.useState(false);

    const { data } = useSWR(
        (settings.city && settings.country) ? `https://compass-api.vercel.app/weather/${settings.city},${settings.country}` : ``, 
        fetcher
    )

    React.useEffect(() => {
        window.addEventListener("DOMContentLoaded", () => {
            setSettings(localStorage.getItem("weatherSettings") ? JSON.parse(localStorage.getItem("weatherSettings") || "") : defaultWeatherSettings);
            setReady(true);
        })
    }, [settings])

    const onWeatherChange = (type: number, newValue: string) => {
        if(type == 0) setSettings({ ...settings, city: newValue, setup: true })
        else setSettings({ ...settings, country: newValue, setup: true })
    }

    return (
        <StyledWeather style={{ paddingRight: "50px" }}>
            <WeatherPreview>
                <WeatherWidget>
                    {(ready && !settings.setup) && <WeatherNotSetup />}
                    {(!data && settings.setup) && <WeatherLoading />}
                    {(data && !data.main) && <WeatherFailed />}
                    {(data && data.main) && (
                        <>
                            <WeatherIcon icon={require("../../assets/weather/cloud.svg")} />
                            <h1>{data ? Math.floor(data.main.temp - 273.15) : 0}°C </h1>
                            <p>{data.name ? data.name : settings.city}, {(data.sys.country && countryCodes[data.sys.country]) ? countryCodes[data.sys.country] : settings.country}</p>
                        </>
                    )}
                </WeatherWidget>
            </WeatherPreview>

            <CheckboxParent>
                <span>City</span>
                <TextField
                    value={settings.city}
                    placeholder={"City"}
                    variant="outlined"
                    size="small"
                    onChange={(e: any) => onWeatherChange(0, e.target.value)}
                />
            </CheckboxParent>

            <CheckboxParent>
                <span>Country</span>
                <TextField
                    value={settings.country}
                    placeholder={"Country"}
                    variant="outlined"
                    size="small"
                    onChange={(e: any) => onWeatherChange(1, e.target.value)}
                />
            </CheckboxParent>
        </StyledWeather>
    )
}