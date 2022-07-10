import React, { useState, useEffect } from "react";
import * as styled from "./Dials.styled";
import { mainTickData } from "./tickData";
import SubDial from "./SubDial";
import { transformHands, timeToDegrees, getAmPm } from "./utilityFunctions";
import { theme } from "./theme";
import { observer } from "mobx-react";
import store from "./store/store";

function MainDial() {
    const [time, setTime] = useState([0, 0, 0]);

    useEffect(() => {
        setInterval(handleSetTime, 1000);
    }, []);

    const handleSetTime = () => {
        setTime(timeToDegrees(0));
    };

    const noSubDialWithSeconds =
        store.subDial.leftDial.currentlyVisible !== "seconds" &&
        store.subDial.rightDial.currentlyVisible !== "seconds" &&
        store.subDial.bottomDial.currentlyVisible !== "seconds";

    return (
        <styled.MainDial primaryMenu={store.primaryMenu}>
            <div className="main-dial-shade">
                <styled.AmPm>{getAmPm(0)}</styled.AmPm>
                {mainTickData.map((tick, i) => (
                    <styled.Tick tick={tick} key={i}>
                        <div style={{ backgroundColor: theme(store.clockColor).ticks }} />
                    </styled.Tick>
                ))}
                <SubDial position="leftDial" />
                <SubDial position="rightDial" />
                <SubDial position="bottomDial" />
                <styled.Hand size={[15, 160]} style={transformHands(time[0])} />
                <styled.Hand size={[10, 230]} style={transformHands(time[1])} />
                {noSubDialWithSeconds && <styled.Hand size={[5, 240]} style={transformHands(time[2])} secondHand />}
                <styled.Cap size={20} />
            </div>
        </styled.MainDial>
    );
}

export default observer(MainDial);
