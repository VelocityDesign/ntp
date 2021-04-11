import React from "react";
import useLocalStorage from "react-use-localstorage";
import { getTime } from "../../utils/time";
import { TimeWidget } from "./style";
import { format } from 'fecha';

export const Time = () => {
    const [time, setTime] = React.useState("");
    const [timeSettings, setTimeSettings] = useLocalStorage('widgets.time.settings', JSON.stringify({ hours: true, minutes: true, seconds: false, milliseconds: false }));

    const [date, setDate] = React.useState("");
    const [dateSettings, setDateSettings] = useLocalStorage('widgets.date.settings', JSON.stringify({ format: "Do MMMM YYYY" }));

    React.useEffect(() => {
        setTime(getTime(JSON.parse(timeSettings)));
        setDate(format(new Date(), JSON.parse(dateSettings).format));

        setInterval(() => {
            setTime(getTime(JSON.parse(timeSettings)));
            setDate(format(new Date(), JSON.parse(dateSettings).format));
        }, 700)
    }, [timeSettings, dateSettings])

    return (
        <TimeWidget>
            <h1>{time}</h1>
            <p>{date}</p>
        </TimeWidget>
    )
}