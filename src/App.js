import MainDial from "./MainDial";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import SecondaryMenu from "./menus/SecondaryMenu";
import PrimaryMenu from "./menus/PrimaryMenu";
import { observer } from "mobx-react";
import store from "./store/store";
import ClocksRow from "./ClocksRow";
import ClockNavMobile from "./ClockNavMobile";

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

const MenuConnector = styled.div`
    border-bottom: 1px solid white;
    width: 50px;
    margin: 0 20px;
    flex-shrink: 0;
    @media (max-width: 1000px), (max-height: 800px) {
        display: none;
    }
`;

function App() {
    return (
        <ThemeProvider theme={theme(store.clocks[store.activeIndex].clockColor)}>
            <Page>
                <ClockNavMobile />
                <ClocksRow />
                <ActiveClock>
                    <PrimaryMenu />
                    <MenuConnector />
                    <MainDial />
                    <MenuConnector />
                    <SecondaryMenu />
                </ActiveClock>
            </Page>
        </ThemeProvider>
    );
}

export default observer(App);
