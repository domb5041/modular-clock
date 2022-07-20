import React, { useState, useEffect } from "react";
import * as styled from "../Ticks.styled";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import { observer } from "mobx-react";
import store from "../store/store";
import moment from "moment";

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
            {store.secondsTickData.map((tick, i) => (
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
