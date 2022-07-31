import React, { useState, useEffect } from "react";
import { HourHand, MinuteHand, SecondHand, HandsCap } from "./Hands.styled";
import SubDial from "./SubDial";
import { transformHands, timeToDegrees } from "./utilityFunctions";
import { Tick } from "./Ticks.styled";
import { theme, colorTransition } from "./theme";
import { observer } from "mobx-react";
import store from "./store/store";
import { transparentize } from "polished";
import styled from "styled-components";

const Container = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 100%;
    border: 4px solid ${(props) => props.theme.base};
    position: relative;
    background-color: ${(props) => props.theme.dialInner};
    transition: background-color ${colorTransition}, border ${colorTransition}, box-shadow ${colorTransition};
    flex-shrink: 0;
    overflow: hidden;
    & .main-dial-shade {
        width: 100%;
        height: 100%;
        background-image: radial-gradient(${transparentize(0.3, "black")}, transparent);
    }
`;

function MainDial() {
    const [time, setTime] = useState([0, 0, 0]);

    useEffect(() => {
        setInterval(handleSetTime, 1000);
    }, []);

    const handleSetTime = () => {
        setTime(timeToDegrees());
    };

    const noSubDialWithSeconds =
        store.clocks[store.activeIndex].subDial.topDial.currentlyVisible !== "seconds" &&
        store.clocks[store.activeIndex].subDial.leftDial.currentlyVisible !== "seconds" &&
        store.clocks[store.activeIndex].subDial.rightDial.currentlyVisible !== "seconds" &&
        store.clocks[store.activeIndex].subDial.bottomDial.currentlyVisible !== "seconds";

    const focusingOnSubDial =
        store.primaryMenu === "topDial" ||
        store.primaryMenu === "leftDial" ||
        store.primaryMenu === "rightDial" ||
        store.primaryMenu === "bottomDial";

    return (
        <Container primaryMenu={store.primaryMenu}>
            <div className="main-dial-shade">
                {store.mainTickData.map((tick, i) => (
                    <Tick tick={tick} key={i}>
                        <div
                            className="tick-marker"
                            style={{ backgroundColor: theme(store.clocks[store.activeIndex].clockColor).ticks }}
                        />
                        {tick.number && <div className="tick-number">{tick.number}</div>}
                    </Tick>
                ))}
                <SubDial position="topDial" />
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
        </Container>
    );
}

export default observer(MainDial);
