import React, { useState, useEffect } from "react";
import * as styled from "../Dials.styled";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import { subTickData } from "./WorldClock";
import { transformHands, timeToDegrees } from "../utilityFunctions";
import { observer } from "mobx-react";
import store from "../store/store";

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
                    <div style={{ backgroundColor: theme(store.clockColor).ticks }} />
                </styled.Tick>
            ))}
            <SubSecondHand style={transformHands(time[2])} />
            <SubHandsCap />
        </>
    );
}

export default observer(Seconds);
