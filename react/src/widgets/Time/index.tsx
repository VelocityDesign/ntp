import React from "react";
import useLocalStorage, { createLocalStorageStateHook } from 'use-local-storage-state'
import { getTime } from "../../utils/time";
import { TimeWidget } from "./style";
import { format } from 'fecha';
import { defaultDATSettings } from "./defaultSettings";
import useLocalForage from "../../hooks/localforage";

export const Time = () => {
    const [time, setTime] = React.useState("");
    const [date, setDate] = React.useState("");

    const [settings] = useLocalForage("datetime.settings", defaultDATSettings);

    const tick = () => {
        const t = getTime(settings.showSeconds);
        const d = format(new Date(), settings.dateFormat)

        setTime(t);
        setDate(d);
    }

    React.useEffect(() => {
        tick()

        setInterval(tick, 700)
    }, [settings])

    return (
        <TimeWidget>
            <h1>{time}</h1>
            <p>{date}</p>
        </TimeWidget>
    )
}