import React, { useState, useEffect } from "react";
import * as styled from "./Dials.styled";
import { theme } from "./theme";
import { subTickData } from "./tickData";
import { transformHands, timeToDegrees, getAmPm } from "./utilityFunctions";

export default function SubDial({ dialId, city, offset, primaryMenu, clockColor, dial }) {
    const [time, setTime] = useState([0, 0, 0]);

    useEffect(() => {
        setInterval(handleSetTime, 1000);
    }, []);

    const handleSetTime = () => {
        setTime(timeToDegrees(offset));
    };

    return (
        <styled.SubDial dialId={dialId} primaryMenu={primaryMenu}>
            {dial === "world clock" && (
                <>
                    <styled.AmPm subDial>{getAmPm(offset)}</styled.AmPm>
                    <styled.City>{city}</styled.City>
                    {subTickData.map((tick, i) => (
                        <styled.Tick tick={tick} key={i}>
                            <div style={{ backgroundColor: theme(clockColor).ticks }} />
                        </styled.Tick>
                    ))}
                    <styled.Hand size={[8, 50]} style={transformHands(time[0])} />
                    <styled.Hand size={[6, 80]} style={transformHands(time[1])} />
                    <styled.Cap size={13} />
                </>
            )}
            {dial === "temperature" && <>temperature</>}
            {dial === "sunrise sunset" && <>sunrise sunset</>}
            {dial === "seconds" && (
                <>
                    {subTickData.map((tick, i) => (
                        <styled.Tick tick={tick} key={i}>
                            <div style={{ backgroundColor: theme(clockColor).ticks }} />
                        </styled.Tick>
                    ))}
                    <styled.Hand size={[5, 80]} style={transformHands(time[2])} secondHand />
                    <styled.Cap size={12} />
                </>
            )}
        </styled.SubDial>
    );
}
