import React from "react";
import { getTime } from "../../utils/time";
import { TimeWidget } from "../../widgets/Time/style";
import { format } from 'fecha';
import { StyledDAT, DATPreview, CheckboxParent } from "./style";
import { Checkbox } from "@material-ui/core";
import { defaultDATSettings } from "../../widgets/Time/defaultSettings";
import useLocalForage from "../../hooks/localforage";

export const DAT = () => {
    const [time, setTime] = React.useState("");
    const [date, setDate] = React.useState("");

    const [settings, setSettings] = useLocalForage("datetime.settings", defaultDATSettings);

    const onTFHChange = () => {
        setSettings({ ...settings, twentyFourHour: !settings.twentyFourHour })
    }

    const onShowSecondsChange = () => {
        setSettings({ ...settings, seconds: !settings.seconds })
    }

    React.useEffect(() => {
        setInterval(() => {
            setTime(getTime(settings.seconds))
        }, 1000)
    }, [settings])

    return (
        <StyledDAT style={{ paddingRight: "50px" }}>
            <DATPreview>
                <TimeWidget>
                    <h1>{time}</h1>
                    <p>{date}</p>
                </TimeWidget>
            </DATPreview>

            <CheckboxParent>
                <span onClick={() => onTFHChange()}>Use 24-hour time</span>
                <Checkbox 
                    color={"primary"} 
                    disableRipple 
                    disableFocusRipple 
                    checked={settings.time.twentyFourHour} 
                    onChange={() => onTFHChange()}
                />
            </CheckboxParent>

            <CheckboxParent>
                <span onClick={() => onShowSecondsChange()}>Show seconds</span>
                <Checkbox 
                    color={"primary"} 
                    disableRipple 
                    disableFocusRipple 
                    checked={settings.time.seconds} 
                    onChange={() => onShowSecondsChange()}
                />
            </CheckboxParent>
        </StyledDAT>
    )
}