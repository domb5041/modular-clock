import React, { useState, useEffect } from "react";
import * as styled from "../Ticks.styled";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import { observer } from "mobx-react";
import { useStores } from "../store";
import moment from "moment";

function Seconds() {
    const { tickStore, clockStore } = useStores();
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
            {tickStore.secondsTickData.map((tick, i) => (
                <styled.Tick tick={tick} key={i}>
                    <div
                        className="tick-marker"
                        style={{ backgroundColor: theme(clockStore.clocks[clockStore.activeIndex].clockColor).ticks }}
                    />
                    {tick.number && <div className="tick-number">{tick.number}</div>}
                </styled.Tick>
            ))}
            <SubSecondHand style={transformHands(seconds)} />
            <SubHandsCap />
        </>
    );
}

export default observer(Seconds);
