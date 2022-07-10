import React, { useState, useEffect } from "react";
import * as styled from "../Dials.styled";
import { theme } from "../theme";
import { subTickData } from "../tickData";
import { transformHands, timeToDegrees, getAmPm } from "../utilityFunctions";
import { observer } from "mobx-react";
import store from "../store/store";

export const timezones = {
    paris: 1,
    tokyo: 9,
    "new delhi": 5.5
};

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
        setTime(timeToDegrees(timezones[timezone]));
    };

    return (
        <styled.SubDial position={position} primaryMenu={store.primaryMenu}>
            <styled.AmPm subDial>{getAmPm(timezones[timezone])}</styled.AmPm>
            <styled.City>{timezone}</styled.City>
            {subTickData.map((tick, i) => (
                <styled.Tick tick={tick} key={i}>
                    <div style={{ backgroundColor: theme(store.clockColor).ticks }} />
                </styled.Tick>
            ))}
            <styled.Hand size={[8, 50]} style={transformHands(time[0])} />
            <styled.Hand size={[6, 80]} style={transformHands(time[1])} />
            <styled.Cap size={13} />
        </styled.SubDial>
    );
}

export default observer(WorldClock);
