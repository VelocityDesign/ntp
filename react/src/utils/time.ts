import React from "react"

export const getTime = (seconds?: boolean) => {
    const date = new Date();

    const time = [];

    time.push(date.getHours().toString().padStart(2, "0"))
    time.push(date.getMinutes().toString().padStart(2, "0"))
    if(seconds) time.push(date.getSeconds().toString().padStart(2, "0"))

    return time.join(":")
}