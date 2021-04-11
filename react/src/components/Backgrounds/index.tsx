import React from "react"
import useLocalStorage, { createLocalStorageStateHook } from 'use-local-storage-state'
import { BackgroundImage, BackgroundItem, StyledBackgrounds, BackgroundSelected  } from "./style"

import solid from "../../assets/settings/backgrounds/solid.png"

export const useBackgroundsSettings = createLocalStorageStateHook('widgets.background.settings', { provider: "unsplash" })

export const Backgrounds = () => {
    const uploadRef = React.createRef<HTMLInputElement>();

    const [bgSettings, setBgSettings] = useBackgroundsSettings();

    const onChangeProvider = (provider: string) => {
        setBgSettings({ ...bgSettings, provider })
    }

    const onUploadClick = () => {
        uploadRef?.current?.click();
    }

    return (
        <StyledBackgrounds>
            <BackgroundItem selected={bgSettings.provider == "unsplash"} onMouseUp={() => onChangeProvider("unsplash")}>
                <BackgroundImage src={require("../../assets/settings/backgrounds/unsplash.svg")} />
                <p>Unsplash</p>
                <BackgroundSelected />
            </BackgroundItem>

            <BackgroundItem selected={bgSettings.provider == "solid"} onMouseUp={() => onChangeProvider("solid")}>
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