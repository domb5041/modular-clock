import MainDial from "./MainDial";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import SecondaryMenu from "./menus/SecondaryMenu";
import PrimaryMenu from "./menus/PrimaryMenu";
import { observer } from "mobx-react";
import store from "./store/store";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MenuConnector = styled.div`
    border-bottom: 1px solid white;
    width: 50px;
    margin: 0 20px;
`;

function App() {
    return (
        <ThemeProvider theme={theme(store.clockColor)}>
            <Container>
                <PrimaryMenu />
                <MenuConnector />
                <MainDial />
                <MenuConnector />
                <SecondaryMenu />
            </Container>
        </ThemeProvider>
    );
}

export default observer(App);
