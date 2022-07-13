import React, { useState, useEffect } from "react";
import * as styled from "../Dials.styled";
import { SubHourHand, SubMinuteHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import { subTickData } from "../tickData";
import { transformHands, timeToDegrees, getAmPm } from "../utilityFunctions";
import { observer } from "mobx-react";
import store from "../store/store";

export const timezones = [
    { name: "London", id: "Europe/London" },
    { name: "Paris", id: "Europe/Paris" },
    { name: "Cairo", id: "Africa/Cairo" },
    { name: "Moscow", id: "Europe/Moscow" },
    { name: "Dubai", id: "Asia/Dubai" },
    { name: "Karachi", id: "Asia/Karachi" },
    { name: "Dhaka", id: "Asia/Dhaka" },
    { name: "Bangkok", id: "Asia/Bangkok" },
    { name: "Hong Kong", id: "Asia/Hong_Kong" },
    { name: "Tokyo", id: "Asia/Tokyo" },
    { name: "Sydney", id: "Australia/Sydney" },
    { name: "Noumea", id: "Pacific/Noumea" },
    { name: "Auckland", id: "Pacific/Auckland" },
    { name: "Samoa", id: "Pacific/Samoa" },
    { name: "Hawaii", id: "US/Hawaii" },
    { name: "Alaska", id: "US/Alaska" },
    { name: "Los Angeles", id: "America/Los_Angeles" },
    { name: "Denver", id: "America/Denver" },
    { name: "Mexico City", id: "America/Mexico_City" },
    { name: "New York", id: "America/New_York" },
    { name: "Caracas", id: "America/Caracas" },
    { name: "Sao Paulo", id: "America/Sao_Paulo" },
    { name: "S. Georgia", id: "Atlantic/South_Georgia" },
    { name: "Azores", id: "Atlantic/Azores" }
];

function WorldClock({ position }) {
    const [time, setTime] = useState([0, 0, 0]);
    const timezone = store.subDial[position].timezone;

    useEffect(() => {
        const timeInterval = setInterval(handleSetTime, 1000);
        return () => {
            clearInterval(timeInterval);
        };
    }, [timezone]);

    const handleSetTime = () => {
        setTime(timeToDegrees(timezone));
    };

    return (
        <>
            <styled.AmPm subDial>{getAmPm(timezone)}</styled.AmPm>
            <styled.City>{timezones.find((o) => o.id === timezone).name}</styled.City>
            {subTickData.map((tick, i) => (
                <styled.Tick tick={tick} key={i}>
                    <div style={{ backgroundColor: theme(store.clockColor).ticks }} />
                </styled.Tick>
            ))}
            <SubHourHand style={transformHands(time[0])} />
            <SubMinuteHand style={transformHands(time[1])} />
            <SubHandsCap />
        </>
    );
}

export default observer(WorldClock);
