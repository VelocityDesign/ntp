import React from "react";
import useLocalStorage from 'use-local-storage-state'
import { getTime } from "../../utils/time";
import { TimeWidget } from "./style";
import { format } from 'fecha';

export const Time = () => {
    const [time, setTime] = React.useState("");
    const [timeSettings, setTimeSettings] = useLocalStorage('widgets.time.settings', { hours: true, minutes: true, seconds: false, milliseconds: false });

    const [date, setDate] = React.useState("");
    const [dateSettings, setDateSettings] = useLocalStorage('widgets.date.settings', { format: "Do MMMM YYYY" });

    React.useEffect(() => {
        setTime(getTime(timeSettings));
        setDate(format(new Date(), dateSettings.format));

        setInterval(() => {
            setTime(getTime(timeSettings));
            setDate(format(new Date(), dateSettings.format));
        }, timeSettings.milliseconds ? 1 : 700)
    }, [dateSettings])

    return (
        <TimeWidget>
            <h1>{time}</h1>
            <p>{date}</p>
        </TimeWidget>
    )
}