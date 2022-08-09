import React, { useState, useEffect } from "react";
import { HourHand, MinuteHand, SecondHand, HandsCap } from "./Hands.styled";
import SubDial from "./SubDial";
import { transformHands, timeToDegrees } from "./utilityFunctions";
import { Tick } from "./Ticks.styled";
import { theme, colorTransition } from "./theme";
import { observer } from "mobx-react";
import { transparentize } from "polished";
import styled from "styled-components";
import { useStores } from "./store";

const Container = styled.div`
    width: 500px;
    height: 500px;
    box-sizing: border-box;
    @media (max-width: 500px) {
        width: 100vw;
        height: 100vw;
    }
    border-radius: 100%;
    border: 0.4rem solid ${(props) => props.theme.base};
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
    const { clockStore, menuStore, tickStore } = useStores();
    const [time, setTime] = useState([0, 0, 0]);

    useEffect(() => {
        setInterval(handleSetTime, 1000);
    }, []);

    const handleSetTime = () => {
        setTime(timeToDegrees());
    };

    const noSubDialWithSeconds =
        clockStore.clocks[clockStore.activeIndex].subDial.topDial.currentlyVisible !== "seconds" &&
        clockStore.clocks[clockStore.activeIndex].subDial.leftDial.currentlyVisible !== "seconds" &&
        clockStore.clocks[clockStore.activeIndex].subDial.rightDial.currentlyVisible !== "seconds" &&
        clockStore.clocks[clockStore.activeIndex].subDial.bottomDial.currentlyVisible !== "seconds";

    const focusingOnSubDial =
        menuStore.primaryMenu === "topDial" ||
        menuStore.primaryMenu === "leftDial" ||
        menuStore.primaryMenu === "rightDial" ||
        menuStore.primaryMenu === "bottomDial";

    return (
        <Container primaryMenu={menuStore.primaryMenu}>
            <div className="main-dial-shade">
                {tickStore.mainTickData.map((tick, i) => (
                    <Tick tick={tick} key={i}>
                        <div
                            className="tick-marker"
                            style={{
                                backgroundColor: theme(clockStore.clocks[clockStore.activeIndex].clockColor).ticks
                            }}
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
