import React, { useState, useEffect } from "react";
import * as styled from "../Dials.styled";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import { transformHands, timeToDegrees } from "../utilityFunctions";
import { observer } from "mobx-react";
import store from "../store/store";

const subTickData = [
    { deg: 0, type: "sub", number: "60" },
    { deg: 30, type: "sub", number: "05" },
    { deg: 60, type: "sub", number: "10" },
    { deg: 90, type: "sub", number: "15" },
    { deg: 120, type: "sub", number: "20" },
    { deg: 150, type: "sub", number: "25" },
    { deg: 180, type: "sub", number: "30" },
    { deg: 210, type: "sub", number: "35" },
    { deg: 240, type: "sub", number: "40" },
    { deg: 270, type: "sub", number: "45" },
    { deg: 300, type: "sub", number: "50" },
    { deg: 330, type: "sub", number: "55" }
];

function Seconds() {
    const [time, setTime] = useState([0, 0, 0]);

    useEffect(() => {
        const timeInterval = setInterval(handleSetTime, 1000);
        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    const handleSetTime = () => {
        setTime(timeToDegrees());
    };

    return (
        <>
            {subTickData.map((tick, i) => (
                <styled.Tick tick={tick} key={i}>
                    <div className="tick-marker" style={{ backgroundColor: theme(store.clockColor).ticks }} />
                    {tick.number && <div className="tick-number">{tick.number}</div>}
                </styled.Tick>
            ))}
            <SubSecondHand style={transformHands(time[2])} />
            <SubHandsCap />
        </>
    );
}

export default observer(Seconds);
