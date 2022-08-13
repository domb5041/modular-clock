import React, { useEffect } from "react";
import MainDial from "./MainDial";
import styled from "styled-components";
import { theme } from "./theme";
import SecondaryMenu from "./menus/SecondaryMenu";
import PrimaryMenu from "./menus/PrimaryMenu";
import { observer } from "mobx-react";
import ClocksRow from "./ClocksRow";
import ClockNavMobile from "./ClockNavMobile";
import PrimaryMenuMobile from "./menus/PrimaryMenuMobile";
import SecondaryMenuMobile from "./menus/SecondaryMenuMobile";
import { useMediaQuery } from "react-responsive";
import { useStores } from "./store";
import { CSSTransition } from "react-transition-group";

const Page = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    overflow: hidden;
    @media ${(props) => props.theme.screen.mobile} {
        flex-direction: column;
    }
`;

const ActiveClock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    overflow: hidden;
    @media ${(props) => props.theme.screen.mobile} {
        overflow: visible;
    }
    & > #clock-slot {
        position: relative;
        width: 500px;
        height: 500px;
        flex-shrink: 0;
        @media ${(props) => props.theme.screen.clockSize} {
            width: 100vw;
            height: 100vw;
        }
    }
`;

function App() {
    const isMobile = useMediaQuery({ query: theme.screen.mobile });
    const { clockStore } = useStores();

    useEffect(() => {
        const interval = setInterval(clockStore.setTime, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [clockStore.setTime]);

    return (
        <Page>
            {isMobile ? <ClockNavMobile /> : <ClocksRow />}
            <ActiveClock>
                {!isMobile && <PrimaryMenu />}
                <div id="clock-slot">
                    {clockStore.clocks.map((clock, i) => (
                        <CSSTransition
                            in={i === clockStore.activeIndex}
                            unmountOnExit
                            timeout={700}
                            classNames="dial"
                            key={i}
                        >
                            <MainDial clock={clock} />
                        </CSSTransition>
                    ))}
                </div>
                {!isMobile && <SecondaryMenu />}
            </ActiveClock>
            {isMobile && <PrimaryMenuMobile />}
            {isMobile && <SecondaryMenuMobile />}
        </Page>
    );
}

export default observer(App);
