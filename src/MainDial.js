import React, { useState, useEffect } from "react";
import { HourHand, MinuteHand, SecondHand, HandsCap } from "./Hands.styled";
import SubDial from "./SubDial";
import { transformHands, timeToDegrees } from "./utilityFunctions";
import Ticks from "./Ticks";
import { colorTransition } from "./theme";
import { observer } from "mobx-react";
import { transparentize } from "polished";
import styled from "styled-components";
import { useStores } from "./store";

const Container = styled.div`
    width: 500px;
    height: 500px;
    box-sizing: border-box;
    @media ${(props) => props.theme.screen.clockSize} {
        width: 100vw;
        height: 100vw;
    }
    border-radius: 100%;
    border: 0.4rem solid ${(props) => props.theme.colors[props.color].base};
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${(props) => props.theme.colors[props.color].dialInner};
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
        transform: translateY(${(props) => props.transitionDirection * 110}%);
        @media ${(props) => props.theme.screen.mobile} {
            transform: translateX(${(props) => props.transitionDirection * 110}%);
        }
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
        transform: translateY(${(props) => props.transitionDirection * -110}%);
        @media ${(props) => props.theme.screen.mobile} {
            transform: translateX(${(props) => props.transitionDirection * -110}%);
        }
    }
`;

function MainDial({ clock }) {
    const { menuStore, tickStore, clockStore } = useStores();
    const { topDial, leftDial, rightDial, bottomDial } = clock.subDial;
    const { primaryMenu } = menuStore;

    const [time, setTime] = useState([0, 0, 0]);

    useEffect(() => {
        setInterval(handleSetTime, 1000);
    }, []);

    const handleSetTime = () => {
        setTime(timeToDegrees());
    };

    const noSubDialWithSeconds =
        topDial.currentlyVisible !== "seconds" &&
        leftDial.currentlyVisible !== "seconds" &&
        rightDial.currentlyVisible !== "seconds" &&
        bottomDial.currentlyVisible !== "seconds";

    const focusingOnSubDial =
        primaryMenu === "topDial" ||
        primaryMenu === "leftDial" ||
        primaryMenu === "rightDial" ||
        primaryMenu === "bottomDial";

    return (
        <Container
            primaryMenu={menuStore.primaryMenu}
            color={clock.clockColor}
            transitionDirection={clockStore.activeIndex > clockStore.previousActiveIndex ? 1 : -1}
        >
            <div className="main-dial-shade">
                <Ticks clock={clock} tickData={tickStore.mainTickData(clock)} />
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
