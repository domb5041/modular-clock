import React, { useEffect } from "react";
import MainDial from "./MainDial";
import styled from "styled-components";
import { theme } from "./theme";
import SecondaryMenu from "./menus/SecondaryMenu";
import PrimaryMenu from "./menus/PrimaryMenu";
import { observer } from "mobx-react";
import ClocksNav from "./ClocksNav";
import ClocksNavMobile from "./ClocksNavMobile";
import PrimaryMenuMobile from "./menus/PrimaryMenuMobile";
import SecondaryMenuMobile from "./menus/SecondaryMenuMobile";
import { useMediaQuery } from "react-responsive";
import { useStores } from "./store";
import { CSSTransition } from "react-transition-group";
import { IClock } from "./sharedTypes";
import axios from "axios";

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
    const { clockStore, weatherStore } = useStores();

    useEffect(() => {
        // clockStore.clearStored();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                weatherStore.setLocation(position.coords.latitude, position.coords.longitude);
            },
            (error) => console.log(error.message)
        );
    }, [weatherStore]);

    useEffect(() => {
        const getWeather = () => {
            axios({
                method: "get",
                url: `/forecast?lat=${weatherStore.latLon[0]}&lon=${weatherStore.latLon[1]}`
            }).then((res) => {
                weatherStore.setWeather(res.data);
            });
        };
        if (weatherStore.latLon) {
            getWeather();
            const timeInterval = setInterval(getWeather, 1000 * 60 * 5);
            return () => {
                clearInterval(timeInterval);
            };
        }
    }, [weatherStore.latLon, weatherStore]);

    useEffect(() => {
        const interval = setInterval(clockStore.setTime, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [clockStore.setTime]);

    return (
        <Page>
            {isMobile ? <ClocksNavMobile /> : <ClocksNav />}
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
                            <MainDial clock={clock as IClock} />
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
