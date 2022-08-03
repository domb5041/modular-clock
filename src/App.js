import MainDial from "./MainDial";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import SecondaryMenu from "./menus/SecondaryMenu";
import PrimaryMenu from "./menus/PrimaryMenu";
import { observer } from "mobx-react";
import store from "./store/store";
import ClocksRow from "./ClocksRow";
import { transparentize } from "polished";

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

const MainDialContainer = styled.div`
    position: relative;
`;

const NextPreviousButtons = styled.div`
    position: absolute;
    bottom: 0;
    left: 5px;
    right: 5px;
    justify-content: space-between;
    display: none;
    @media (max-width: 1000px), (max-height: 800px) {
        display: flex;
    }
    & > button {
        background-color: ${transparentize(0.8, "white")};
        border: none;
        color: white;
        border-radius: 5px;
        font-size: 25px;
        padding: 5px 12px;
        &:disabled {
            color: grey;
        }
    }
`;

function App() {
    return (
        <ThemeProvider theme={theme(store.clocks[store.activeIndex].clockColor)}>
            <Page>
                <ActiveClock>
                    <PrimaryMenu />
                    <MenuConnector />
                    <MainDialContainer>
                        <MainDial />
                        <NextPreviousButtons>
                            <button
                                disabled={store.activeIndex < 1}
                                onClick={() => {
                                    const newId = store.clocks[store.activeIndex - 1].id;
                                    store.setActiveClock(newId);
                                }}
                            >
                                ◀︎
                            </button>
                            <button
                                disabled={store.activeIndex >= store.clocks.length - 1}
                                onClick={() => {
                                    const newId = store.clocks[store.activeIndex + 1].id;
                                    store.setActiveClock(newId);
                                }}
                            >
                                ▶︎
                            </button>
                        </NextPreviousButtons>
                    </MainDialContainer>
                    <MenuConnector />
                    <SecondaryMenu />
                </ActiveClock>
                <ClocksRow />
            </Page>
        </ThemeProvider>
    );
}

export default observer(App);
