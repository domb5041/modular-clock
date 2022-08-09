import MainDial from "./MainDial";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
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

const Page = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    @media (max-width: 1000px), (max-height: 800px) {
        display: block;
        position: relative;
    }
`;

const ActiveClock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    overflow: hidden;
`;

function App() {
    const isMobile = useMediaQuery({ query: "(max-width: 1000px), (max-height: 800px)" });
    const { clockStore } = useStores();
    return (
        <ThemeProvider theme={theme(clockStore.clocks[clockStore.activeIndex].clockColor)}>
            <Page>
                {isMobile ? <ClockNavMobile /> : <ClocksRow />}
                <ActiveClock>
                    {!isMobile && <PrimaryMenu />}
                    <MainDial />
                    {!isMobile && <SecondaryMenu />}
                </ActiveClock>
                {isMobile && <PrimaryMenuMobile />}
                {isMobile && <SecondaryMenuMobile />}
            </Page>
        </ThemeProvider>
    );
}

export default observer(App);
