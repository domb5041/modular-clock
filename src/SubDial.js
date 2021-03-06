import React from "react";
import WorldClock from "./complications/WorldClock";
import Seconds from "./complications/Seconds";
import Temperature from "./complications/Temperature";
import SunDial from "./complications/SunDial";
import { observer } from "mobx-react";
import store from "./store/store";
import styled, { css } from "styled-components";
import { colorTransition } from "./theme";
import Monogram from "./complications/Monogram";

const DialSlot = styled.div`
    width: 18rem;
    height: 18rem;
    box-sizing: border-box;
    position: absolute;
    border-radius: 100%;
    ${(props) =>
        (props.position === "topDial" &&
            css`
                top: 10.5rem;
                left: 50%;
                transform: translate(-50%, -50%);
            `) ||
        (props.position === "leftDial" &&
            css`
                left: 10.5rem;
                top: 50%;
                transform: translate(-50%, -50%);
            `) ||
        (props.position === "rightDial" &&
            css`
                right: 10.5rem;
                top: 50%;
                transform: translate(50%, -50%);
            `) ||
        (props.position === "bottomDial" &&
            css`
                bottom: 10.5rem;
                left: 50%;
                transform: translate(-50%, 50%);
            `)};
`;

const DialBackground = styled(DialSlot)`
    border: 0.2rem solid ${(props) => props.theme.base};
    background-color: ${(props) => props.theme.subDial};
    transition: background-color ${colorTransition}, border ${colorTransition}, opacity 0.2s;
    opacity: ${(props) => (props.isHidden ? 0 : 1)};
`;

const DialHighlight = styled(DialSlot)`
    border: 0.3rem solid white;
    width: 19.5rem;
    height: 19.5rem;
    transition: opacity 0.2s;
    opacity: ${(props) => (props.primaryMenu === props.position ? 1 : 0)};
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
`;

function SubDial({ position }) {
    const { currentlyVisible } = store.clocks[store.activeIndex].subDial[position];
    const isHidden = currentlyVisible === "none" || currentlyVisible === "monogram";
    const dialComplications = {
        "world-clock": <WorldClock position={position} />,
        temperature: <Temperature />,
        "sun-dial": <SunDial />,
        seconds: <Seconds />,
        monogram: <Monogram position={position} />,
        none: null
    };

    return (
        <>
            <DialBackground isHidden={isHidden} position={position} />
            <DialHighlight primaryMenu={store.primaryMenu} position={position} />
            <DialSlot position={position}>{dialComplications[currentlyVisible]}</DialSlot>
        </>
    );
}

export default observer(SubDial);
