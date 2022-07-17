import React from "react";
import WorldClock from "./complications/WorldClock";
import Seconds from "./complications/Seconds";
import Temperature from "./complications/Temperature";
import SunDial from "./complications/SunDial";
import { observer } from "mobx-react";
import store from "./store/store";
import styled, { css } from "styled-components";
import { colorTransition } from "./theme";

const SubDial = styled.div`
    width: 180px;
    height: 180px;
    border-radius: 100%;
    border: 2px solid ${(props) => props.theme.base};
    position: absolute;
    background-color: ${(props) => props.theme.subDial};
    transition: background-color ${colorTransition}, border ${colorTransition}, opacity 0.2s;
    opacity: ${(props) => (props.isHidden ? 0 : 1)};
    ${(props) =>
        (props.position === "topDial" &&
            css`
                top: 105px;
                left: 50%;
                transform: translate(-50%, -50%);
            `) ||
        (props.position === "leftDial" &&
            css`
                left: 105px;
                top: 50%;
                transform: translate(-50%, -50%);
            `) ||
        (props.position === "rightDial" &&
            css`
                right: 105px;
                top: 50%;
                transform: translate(50%, -50%);
            `) ||
        (props.position === "bottomDial" &&
            css`
                bottom: 105px;
                left: 50%;
                transform: translate(-50%, 50%);
            `)};
`;

const SubDialHighlight = styled(SubDial)`
    position: absolute;
    border: 4px solid white;
    width: 192px;
    height: 192px;
    transition: opacity 0.2s;
    opacity: ${(props) => (props.primaryMenu === props.position ? 1 : 0)};
    background-color: transparent;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

function _SubDial({ position }) {
    const complications = {
        "world-clock": <WorldClock position={position} />,
        temperature: <Temperature />,
        "sun-dial": <SunDial />,
        seconds: <Seconds />,
        none: null
    };
    return (
        <>
            <SubDial
                position={position}
                primaryMenu={store.primaryMenu}
                isHidden={store.subDial[position].currentlyVisible === "none"}
            >
                {complications[store.subDial[position].currentlyVisible]}
            </SubDial>
            <SubDialHighlight primaryMenu={store.primaryMenu} position={position} />
        </>
    );
}

export default observer(_SubDial);
