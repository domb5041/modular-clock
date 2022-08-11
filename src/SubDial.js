import React from "react";
import WorldClock from "./complications/WorldClock";
import Seconds from "./complications/Seconds";
import Temperature from "./complications/Temperature";
import SunDial from "./complications/SunDial";
import { observer } from "mobx-react";
import styled from "styled-components";
import { colorTransition } from "./theme";
import Monogram from "./complications/Monogram";
import { useStores } from "./store";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const DialSlot = styled.div`
    width: 18rem;
    height: 18rem;
    position: absolute;
    &.topDial {
        top: 10.5rem;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    &.leftDial {
        left: 10.5rem;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &.rightDial {
        right: 10.5rem;
        top: 50%;
        transform: translate(50%, -50%);
    }
    &.bottomDial {
        bottom: 10.5rem;
        left: 50%;
        transform: translate(-50%, 50%);
    }
    & .dial-enter {
        opacity: 0;
    }
    & .dial-enter-active {
        opacity: 1;
        transition: 0.2s;
    }
    & .dial-exit {
        opacity: 1;
    }
    & .dial-exit-active {
        opacity: 0;
        transition: 0.2s;
    }
`;

export const DialBackground = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    position: relative;
    border: 0.2rem solid ${(props) => props.theme.base};
    background-color: ${(props) => props.theme.subDial};
    transition: background-color ${colorTransition}, border ${colorTransition};
`;

const DialHighlight = styled(DialSlot)`
    border-radius: 100%;
    border: 0.3rem solid white;
    width: 19.5rem;
    height: 19.5rem;
    transition: opacity 0.2s;
    opacity: ${(props) => (props.primaryMenu === props.position ? 1 : 0)};
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
`;

function SubDial({ position }) {
    const { clockStore, menuStore } = useStores();
    const { currentlyVisible } = clockStore.clocks[clockStore.activeIndex].subDial[position];
    const dialComplications = {
        "world-clock": <WorldClock position={position} />,
        temperature: <Temperature />,
        "sun-dial": <SunDial />,
        seconds: <Seconds />,
        monogram: <Monogram position={position} />,
        none: <></>
    };

    return (
        <>
            <DialHighlight primaryMenu={menuStore.primaryMenu} position={position} className={position} />
            <DialSlot position={position} className={position}>
                <SwitchTransition>
                    <CSSTransition
                        key={currentlyVisible}
                        addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                        classNames="dial"
                    >
                        {dialComplications[currentlyVisible]}
                    </CSSTransition>
                </SwitchTransition>
            </DialSlot>
        </>
    );
}

export default observer(SubDial);
