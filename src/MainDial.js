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
    border: 0.4rem solid ${(props) => props.theme[props.color].base};
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${(props) => props.theme[props.color].dialInner};
    transition: background-color ${colorTransition}, border ${colorTransition}, box-shadow ${colorTransition};
    flex-shrink: 0;
    overflow: hidden;
    & .main-dial-shade {
        width: 100%;
        height: 100%;
        background-image: radial-gradient(${transparentize(0.3, "black")}, transparent);
    }
    &.dial-enter {
        opacity: 0;
        transform: translateY(-110%);
    }
    &.dial-enter-active {
        opacity: 1;
        transition: 0.7s;
        transform: translateY(0);
    }
    &.dial-exit {
        opacity: 1;
        transform: translateY(0);
    }
    &.dial-exit-active {
        opacity: 0;
        transition: 0.7s;
        transform: translateY(110%);
    }
`;

function MainDial({ clock }) {
    const { menuStore, tickStore } = useStores();
    const [time, setTime] = useState([0, 0, 0]);

    useEffect(() => {
        setInterval(handleSetTime, 1000);
    }, []);

    const handleSetTime = () => {
        setTime(timeToDegrees());
    };

    const noSubDialWithSeconds =
        clock.subDial.topDial.currentlyVisible !== "seconds" &&
        clock.subDial.leftDial.currentlyVisible !== "seconds" &&
        clock.subDial.rightDial.currentlyVisible !== "seconds" &&
        clock.subDial.bottomDial.currentlyVisible !== "seconds";

    const focusingOnSubDial =
        menuStore.primaryMenu === "topDial" ||
        menuStore.primaryMenu === "leftDial" ||
        menuStore.primaryMenu === "rightDial" ||
        menuStore.primaryMenu === "bottomDial";

    return (
        <Container primaryMenu={menuStore.primaryMenu} color={clock.clockColor}>
            <div className="main-dial-shade">
                {tickStore.mainTickData(clock).map((tick, i) => (
                    <Tick tick={tick} key={i}>
                        <div
                            className="tick-marker"
                            style={{
                                backgroundColor: theme[clock.clockColor].ticks
                            }}
                        />
                        {tick.number && <div className="tick-number">{tick.number}</div>}
                    </Tick>
                ))}
                <SubDial position="topDial" clock={clock} />
                <SubDial position="leftDial" clock={clock} />
                <SubDial position="rightDial" clock={clock} />
                <SubDial position="bottomDial" clock={clock} />
                <HourHand focusingOnSubDial={focusingOnSubDial} style={transformHands(time[0])} />
                <MinuteHand focusingOnSubDial={focusingOnSubDial} style={transformHands(time[1])} />
                {noSubDialWithSeconds && (
                    <SecondHand
                        focusingOnSubDial={focusingOnSubDial}
                        style={transformHands(time[2])}
                        color={clock.clockColor}
                    />
                )}
                <HandsCap />
            </div>
        </Container>
    );
}

export default observer(MainDial);
