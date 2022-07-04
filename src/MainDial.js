import React, { useState, useEffect } from "react";
import * as styled from "./Dials.styled";
import { mainTickData } from "./tickData";
import SubDial from "./SubDial";
import { transformHands, timeToDegrees, getAmPm } from "./utilityFunctions";
import { theme } from "./theme";

export default function MainDial({ primaryMenu, clockColor }) {
    const [time, setTime] = useState([0, 0, 0]);

    useEffect(() => {
        setInterval(handleSetTime, 1000);
    }, []);

    const handleSetTime = () => {
        setTime(timeToDegrees(0));
    };

    return (
        <styled.MainDial primaryMenu={primaryMenu}>
            <div className="main-dial-shade">
                <styled.AmPm>{getAmPm(0)}</styled.AmPm>
                {mainTickData.map((tick, i) => (
                    <styled.Tick tick={tick} key={i}>
                        <div style={{ backgroundColor: theme(clockColor).ticks }} />
                    </styled.Tick>
                ))}
                <SubDial dialId="leftDial" city="paris" offset={1} primaryMenu={primaryMenu} clockColor={clockColor} />
                <SubDial dialId="rightDial" city="tokyo" offset={9} primaryMenu={primaryMenu} clockColor={clockColor} />
                <SubDial
                    dialId="bottomDial"
                    city="new delhi"
                    offset={5.5}
                    primaryMenu={primaryMenu}
                    clockColor={clockColor}
                />
                <styled.Hand size={[15, 160]} style={transformHands(time[0])} />
                <styled.Hand size={[10, 230]} style={transformHands(time[1])} />
                <styled.Hand size={[5, 240]} style={transformHands(time[2])} secondHand />
                <styled.Cap size={20} />
            </div>
        </styled.MainDial>
    );
}
