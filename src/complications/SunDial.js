import React, { useState, useEffect } from "react";
import { Tick } from "../Ticks.styled";
import { SubMinuteHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import moment from "moment";
import { observer } from "mobx-react";
import store from "../store/store";

const subTickData = [
    { deg: 0, type: "subShort", number: "12" },
    { deg: 15, type: "subShort" },
    { deg: 30, type: "subShort", number: "14" },
    { deg: 45, type: "subShort" },
    { deg: 60, type: "subShort", number: "16" },
    { deg: 75, type: "subShort" },
    { deg: 90, type: "subShort", number: "18" },
    { deg: 105, type: "subShort" },
    { deg: 120, type: "subShort", number: "20" },
    { deg: 135, type: "subShort" },
    { deg: 150, type: "subShort", number: "22" },
    { deg: 165, type: "subShort" },
    { deg: 180, type: "subShort", number: "24" },
    { deg: 195, type: "subShort" },
    { deg: 210, type: "subShort", number: "02" },
    { deg: 225, type: "subShort" },
    { deg: 240, type: "subShort", number: "04" },
    { deg: 255, type: "subShort" },
    { deg: 270, type: "subShort", number: "06" },
    { deg: 285, type: "subShort" },
    { deg: 300, type: "subShort", number: "08" },
    { deg: 315, type: "subShort" },
    { deg: 330, type: "subShort", number: "10" },
    { deg: 345, type: "subShort" }
];

function SunDial() {
    const [hour, setHour] = useState(0);

    useEffect(() => {
        const timeInterval = setInterval(handleSetTime, 1000);
        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    const handleSetTime = () => {
        setHour(timeToDegrees());
    };

    const timeToDegrees = () => {
        const d = moment();

        const hrsToSeconds = d.hours() * 3600;
        const minsToSeconds = d.minutes() * 60;
        const seconds = d.seconds();

        const hrsToDeg = (hrsToSeconds + minsToSeconds + seconds) * (360 / 86400);

        return hrsToDeg;
    };

    const transformHands = (hand) => ({
        transform: `translateX(-50%) rotate(${hand + 180}deg)`
    });

    return (
        <>
            {subTickData.map((tick, i) => (
                <Tick tick={tick} key={i}>
                    <div className="tick-marker" style={{ backgroundColor: theme(store.clockColor).ticks }} />
                    {tick.number && <div className="tick-number">{tick.number}</div>}
                </Tick>
            ))}
            <SubMinuteHand style={transformHands(hour)} />
            <SubHandsCap />
        </>
    );
}

export default observer(SunDial);
