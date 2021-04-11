import React from "react";
import { usePersistedState } from '@dannyman/use-store';
import { getTime } from "../../utils/time";
import { TimeWidget } from "./style";
import { format } from 'fecha';
import { defaultDATSettings } from "./defaultSettings";
import useLocalState from '@phntms/use-local-state';

export const [timeSettings, setTimeSettings] = useLocalState('datetime.settings', defaultDATSettings);

export const Time = () => {
    const [time, setTime] = React.useState("");
    const [date, setDate] = React.useState("");

    let timeInterval: any;

    const tick = () => {
        const t = getTime(timeSettings.showSeconds, timeSettings.twentyFourHour);
        const d = format(new Date(), timeSettings.dateFormat)

        setTime(t);
        setDate(d);
    }

    React.useEffect(() => {
        console.log("time", timeSettings)

        tick()

        timeInterval = setInterval(tick, 700)

        return () => clearInterval(timeInterval);
    }, [timeSettings])

    return (
        <TimeWidget>
            <h1>{time}</h1>
            <p>{date}</p>
        </TimeWidget>
    )
}