import React, { useState, useEffect } from "react";
import * as styled from "./Dials.styled";
import { HourHand, MinuteHand, SecondHand, HandsCap } from "./Hands.styled";
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
        setTime(timeToDegrees());
    };

    const noSubDialWithSeconds =
        store.subDial.leftDial.currentlyVisible !== "seconds" &&
        store.subDial.rightDial.currentlyVisible !== "seconds" &&
        store.subDial.bottomDial.currentlyVisible !== "seconds";

    const focusingOnSubDial =
        store.primaryMenu === "leftDial" || store.primaryMenu === "rightDial" || store.primaryMenu === "bottomDial";

    return (
        <styled.MainDial primaryMenu={store.primaryMenu}>
            <div className="main-dial-shade">
                <styled.AmPm>{getAmPm()}</styled.AmPm>
                {store.mainTickData.map((tick, i) => (
                    <styled.Tick tick={tick} key={i}>
                        <div style={{ backgroundColor: theme(store.clockColor).ticks }} />
                    </styled.Tick>
                ))}
                <SubDial position="leftDial" />
                <SubDial position="rightDial" />
                <SubDial position="bottomDial" />
                <HourHand focusingOnSubDial={focusingOnSubDial} style={transformHands(time[0])} />
                <MinuteHand focusingOnSubDial={focusingOnSubDial} style={transformHands(time[1])} />
                {noSubDialWithSeconds && (
                    <SecondHand focusingOnSubDial={focusingOnSubDial} style={transformHands(time[2])} />
                )}
                <HandsCap />
            </div>
        </styled.MainDial>
    );
}

export default observer(MainDial);
