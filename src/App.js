import MainDial from "./MainDial";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import SecondaryMenu from "./menus/SecondaryMenu";
import PrimaryMenu from "./menus/PrimaryMenu";
import { observer } from "mobx-react";
import store from "./store/store";
import ClocksRow from "./ClocksRow";

const Page = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 50px;
    overflow: hidden;
`;

const ActiveClock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const MenuConnector = styled.div`
    border-bottom: 1px solid white;
    width: 50px;
    margin: 0 20px;
    flex-shrink: 0;
    @media (max-width: 1000px) {
        display: none;
    }
`;

function App() {
    return (
        <ThemeProvider theme={theme(store.clocks[store.activeIndex].clockColor)}>
            <Page>
                <ActiveClock>
                    <PrimaryMenu />
                    <MenuConnector />
                    <MainDial />
                    <MenuConnector />
                    <SecondaryMenu />
                </ActiveClock>
                <ClocksRow />
            </Page>
        </ThemeProvider>
    );
}

export default observer(App);
