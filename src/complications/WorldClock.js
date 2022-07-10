import React, { useState, useEffect } from "react";
import * as styled from "../Dials.styled";
import { theme } from "../theme";
import { subTickData } from "../tickData";
import { transformHands, timeToDegrees, getAmPm } from "../utilityFunctions";
import { observer } from "mobx-react";
import store from "../store/store";
import { timezones } from "../timezones";

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
        setTime(timeToDegrees(timezone));
    };

    return (
        <styled.SubDial position={position} primaryMenu={store.primaryMenu}>
            <styled.AmPm subDial>{getAmPm(timezone)}</styled.AmPm>
            <styled.City>{timezones.find((o) => o.id === timezone).name}</styled.City>
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
