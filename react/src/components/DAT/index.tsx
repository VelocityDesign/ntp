import React from "react";
import { getTime } from "../../utils/time";
import { TimeWidget } from "../../widgets/Time/style";
import { StyledDAT, DATPreview, CheckboxParent } from "./style";
import { Checkbox } from "@material-ui/core";
import { defaultDATSettings } from "../../widgets/Time/defaultSettings";
import useLocalState from '@phntms/use-local-state';
import { setTimeSettings, timeSettings } from "../../widgets/Time";

export const DAT = () => {
    const [time, setTime] = React.useState("");
    const [date, setDate] = React.useState("");

    let timeInterval: any;

    const onTFHChange = () => {
        setTimeSettings({ ...timeSettings, twentyFourHour: !timeSettings.twentyFourHour })
    }

    const onShowSecondsChange = () => {
        setTimeSettings({ ...timeSettings, showSeconds: !timeSettings.showSeconds })
    }

    React.useEffect(() => {
        console.log("dat", timeSettings)

        timeInterval = setInterval(() => {
            setTime(getTime(timeSettings.showSeconds, timeSettings.twentyFourHour))
        }, 1)

        return () => clearInterval(timeInterval);
    }, [timeSettings])

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
                    checked={timeSettings.twentyFourHour} 
                    onChange={() => onTFHChange()}
                />
            </CheckboxParent>

            <CheckboxParent>
                <span onClick={() => onShowSecondsChange()}>Show seconds</span>
                <Checkbox 
                    color={"primary"} 
                    disableRipple 
                    disableFocusRipple 
                    checked={timeSettings.showSeconds} 
                    onChange={() => onShowSecondsChange()}
                />
            </CheckboxParent>
        </StyledDAT>
    )
}