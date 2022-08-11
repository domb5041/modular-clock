import React, { useState, useEffect } from "react";
import { Tick } from "../Ticks.styled";
import { SubHourHand, SubMinuteHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import { transformHands, timeToDegrees, getAmPm } from "../utilityFunctions";
import { observer } from "mobx-react";
import { useStores } from "../store";
import styled from "styled-components";
import { DialBackground } from "../SubDial";

const City = styled.div`
    color: ${(props) => props.theme.text};
    text-transform: uppercase;
    position: absolute;
    bottom: 5.5rem;
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
`;

const AmPm = styled.div`
    color: ${(props) => props.theme.text};
    text-transform: uppercase;
    position: absolute;
    top: 5.5rem;
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
`;

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

function WorldClock({ position, clock }) {
    const { tickStore } = useStores();
    const [time, setTime] = useState([0, 0, 0]);
    const timezone = clock.subDial[position].timezone;

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
        <DialBackground color={clock.clockColor}>
            <AmPm subDial>{getAmPm(timezone)}</AmPm>
            <City>{timezones.find((o) => o.id === timezone).name}</City>
            {tickStore.worldClockTickData.map((tick, i) => (
                <Tick tick={tick} key={i}>
                    <div className="tick-marker" style={{ backgroundColor: theme[clock.clockColor].ticks }} />
                    {tick.number && <div className="tick-number">{tick.number}</div>}
                </Tick>
            ))}
            <SubHourHand style={transformHands(time[0])} />
            <SubMinuteHand style={transformHands(time[1])} />
            <SubHandsCap />
        </DialBackground>
    );
}

export default observer(WorldClock);
