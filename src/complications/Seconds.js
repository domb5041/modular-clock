import React, { useState, useEffect } from "react";
import * as styled from "../Dials.styled";
import { theme } from "../theme";
import { subTickData } from "../tickData";
import { transformHands, timeToDegrees } from "../utilityFunctions";
import { observer } from "mobx-react";
import store from "../store/store";

function Seconds({ position }) {
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
        <styled.SubDial position={position} primaryMenu={store.primaryMenu}>
            {subTickData.map((tick, i) => (
                <styled.Tick tick={tick} key={i}>
                    <div style={{ backgroundColor: theme(store.clockColor).ticks }} />
                </styled.Tick>
            ))}
            <styled.Hand size={[5, 80]} style={transformHands(time[2])} secondHand />
            <styled.Cap size={12} />
        </styled.SubDial>
    );
}

export default observer(Seconds);
