import React, { useState, useEffect } from "react";
import * as styled from "../Ticks.styled";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import { observer } from "mobx-react";
import store from "../store/store";
import moment from "moment";

const subTickData = [
    { deg: 0, type: "subShort", number: "60" },
    { deg: 30, type: "subShort", number: "05" },
    { deg: 60, type: "subShort", number: "10" },
    { deg: 90, type: "subShort", number: "15" },
    { deg: 120, type: "subShort", number: "20" },
    { deg: 150, type: "subShort", number: "25" },
    { deg: 180, type: "subShort", number: "30" },
    { deg: 210, type: "subShort", number: "35" },
    { deg: 240, type: "subShort", number: "40" },
    { deg: 270, type: "subShort", number: "45" },
    { deg: 300, type: "subShort", number: "50" },
    { deg: 330, type: "subShort", number: "55" }
];

function Seconds() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timeInterval = setInterval(handleSetTime, 1000);
        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    const handleSetTime = () => {
        setSeconds(timeToDegrees());
    };

    const timeToDegrees = () => {
        const s = moment().seconds();
        const secsToDeg = s * (360 / 60);
        return secsToDeg;
    };

    const transformHands = (hand) => ({
        transform: `translateX(-50%) rotate(${hand}deg)`
    });

    return (
        <>
            {subTickData.map((tick, i) => (
                <styled.Tick tick={tick} key={i}>
                    <div className="tick-marker" style={{ backgroundColor: theme(store.clockColor).ticks }} />
                    {tick.number && <div className="tick-number">{tick.number}</div>}
                </styled.Tick>
            ))}
            <SubSecondHand style={transformHands(seconds)} />
            <SubHandsCap />
        </>
    );
}

export default observer(Seconds);
