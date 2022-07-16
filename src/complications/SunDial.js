import React, { useState, useEffect } from "react";
import { Tick } from "../Dials.styled";
import { SubMinuteHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import moment from "moment";
import { observer } from "mobx-react";
import store from "../store/store";

const subTickData = [
    { deg: 0, type: "sub", number: "12" },
    { deg: 15, type: "sub" },
    { deg: 30, type: "sub", number: "14" },
    { deg: 45, type: "sub" },
    { deg: 60, type: "sub", number: "16" },
    { deg: 75, type: "sub" },
    { deg: 90, type: "sub", number: "18" },
    { deg: 105, type: "sub" },
    { deg: 120, type: "sub", number: "20" },
    { deg: 135, type: "sub" },
    { deg: 150, type: "sub", number: "22" },
    { deg: 165, type: "sub" },
    { deg: 180, type: "sub", number: "24" },
    { deg: 195, type: "sub" },
    { deg: 210, type: "sub", number: "02" },
    { deg: 225, type: "sub" },
    { deg: 240, type: "sub", number: "04" },
    { deg: 255, type: "sub" },
    { deg: 270, type: "sub", number: "06" },
    { deg: 285, type: "sub" },
    { deg: 300, type: "sub", number: "08" },
    { deg: 315, type: "sub" },
    { deg: 330, type: "sub", number: "10" },
    { deg: 345, type: "sub" }
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
