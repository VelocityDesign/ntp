import React from "react"

import '../../reset.css';
import '../../positions.css';
import { NTP } from "./style";

import backgrounds from "../../backgrounds.json";
import { Time } from "../../widgets/Time";
import { Weather } from "../../widgets/Weather";

const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

export const App = () => {
    const [ready, setReady] = React.useState(false);

    const img = new Image();
    img.src = `backgrounds/unsplash/${background.id}.jpeg`;
    img.addEventListener("load", () => {
        setReady(true);
    })

    return (
        <NTP backgroundSrc={background.id} ready={ready}>
            <Time />
            <Weather />
        </NTP>
    )
}