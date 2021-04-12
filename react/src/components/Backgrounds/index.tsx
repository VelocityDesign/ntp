import React from "react"
import { BackgroundImage, BackgroundItem, StyledBackgrounds, BackgroundSelected  } from "./style"

import solid from "../../assets/settings/backgrounds/solid.png"
import { useStore } from "react-hookstore";

export const Backgrounds = () => {
    const uploadRef = React.createRef<HTMLInputElement>();

    const [settings, setSettings]: [{ provider: string }, any] = useStore('backgroundSettings');

    const onChangeProvider = (provider: string) => {
        setSettings({ ...settings, provider })
    }

    const onUploadClick = () => {
        uploadRef?.current?.click();
    }

    return (
        <StyledBackgrounds>
            <BackgroundItem selected={settings.provider == "unsplash"} onMouseUp={() => onChangeProvider("unsplash")}>
                <BackgroundImage src={require("../../assets/settings/backgrounds/unsplash.svg")} />
                <p>Unsplash</p>
                <BackgroundSelected />
            </BackgroundItem>

            <BackgroundItem selected={settings.provider == "solid"} onMouseUp={() => onChangeProvider("solid")}>
                <BackgroundImage src={solid} />
                <p>Solid Colour</p>
                <BackgroundSelected />
            </BackgroundItem>

            <BackgroundItem selected={false} noHover={true} onMouseUp={() => onUploadClick()}>
                <BackgroundImage src={require("../../assets/settings/backgrounds/upload.svg")} />
                <p>Upload a picture</p>
                <BackgroundSelected />
            </BackgroundItem>

            <input type="file" style={{ display: "none" }} ref={uploadRef}></input>
        </StyledBackgrounds>
    )
}