import React, { useState, useEffect } from "react";
import * as styled from "./Dials.styled";
import { mainTickData } from "./tickData";
import SubDial from "./SubDial";
import { transformHands, timeToDegrees, getAmPm } from "./utilityFunctions";

export default function MainDial() {
    const [time, setTime] = useState([0, 0, 0]);

    useEffect(() => {
        setInterval(handleSetTime, 1000);
    }, []);

    const handleSetTime = () => {
        setTime(timeToDegrees(0));
    };

    return (
        <styled.MainDial>
            <styled.AmPm>{getAmPm(0)}</styled.AmPm>
            {mainTickData.map((tick, i) => (
                <styled.Tick tick={tick} key={i}>
                    <div />
                </styled.Tick>
            ))}
            <SubDial position="left" city="paris" offset={1} />
            <SubDial position="right" city="tokyo" offset={9} />
            <SubDial position="bottom" city="new delhi" offset={5.5} />
            <styled.Hand size={[15, 160]} style={transformHands(time[0])} />
            <styled.Hand size={[10, 230]} style={transformHands(time[1])} />
            <styled.Hand size={[5, 240]} style={transformHands(time[2])} color="red" />
            <styled.Cap size={20} />
        </styled.MainDial>
    );
}
