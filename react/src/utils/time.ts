import React from "react"

export const getTime = (
    { 
        hours = true, 
        minutes = true, 
        seconds = false, 
        milliseconds = false 
    }: { 
        hours?: boolean, 
        minutes?: boolean, 
        seconds?: boolean, 
        milliseconds?: boolean 
    }
) => {
    const date = new Date();

    const time = [];

    if(hours) time.push(date.getHours().toString().padStart(2, "0"))
    if(minutes) time.push(date.getMinutes().toString().padStart(2, "0"))
    if(seconds) time.push(date.getSeconds().toString().padStart(2, "0"))
    if(milliseconds) time.push(date.getMilliseconds().toString().padStart(2, "0"))

    return time.join(":")
}