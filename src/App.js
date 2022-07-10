import MainDial from "./MainDial";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme, swatches } from "./theme";
import Menu from "./Menu";
import { observer } from "mobx-react";
import store from "./store/store";
import { timezones } from "./complications/WorldClock";

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
    const primaryMenuOptions = [
        { id: "colour", name: "colour" },
        { id: "leftDial", name: "left dial" },
        { id: "rightDial", name: "right dial" },
        { id: "bottomDial", name: "bottom dial" }
    ];

    const subDialMenu = (pos) => [
        {
            id: "world-clock",
            name: "world clock",
            options: [
                {
                    id: "timezone-selector",
                    type: "dropdown",
                    value: store.subDial[pos].timezone,
                    list: Object.keys(timezones),
                    label: "city",
                    onChange: (city) => store.setSubDial(pos, "timezone", city)
                }
            ]
        },
        { id: "temperature", name: "temperature" },
        { id: "sun-dial", name: "sunrise sunset" },
        { id: "seconds", name: "seconds" }
    ];

    const secondaryMenus = {
        colour: { menu: swatches, onClick: (c) => store.setClockColor(c), activeItem: store.clockColor },
        leftDial: {
            menu: subDialMenu("leftDial"),
            onClick: (dialId) => store.setSubDial("leftDial", "currentlyVisible", dialId),
            activeItem: store.subDial.leftDial.currentlyVisible
        },
        rightDial: {
            menu: subDialMenu("rightDial"),
            onClick: (dialId) => store.setSubDial("rightDial", "currentlyVisible", dialId),
            activeItem: store.subDial.rightDial.currentlyVisible
        },
        bottomDial: {
            menu: subDialMenu("bottomDial"),
            onClick: (dialId) => store.setSubDial("bottomDial", "currentlyVisible", dialId),
            activeItem: store.subDial.bottomDial.currentlyVisible
        }
    };

    return (
        <ThemeProvider theme={theme(store.clockColor)}>
            <Container>
                <Menu
                    activeItem={store.primaryMenu}
                    menu={primaryMenuOptions}
                    onClick={(c) => store.setPrimaryMenu(c)}
                />
                <MenuConnector />
                <MainDial />
                <MenuConnector />
                <Menu
                    menu={secondaryMenus[store.primaryMenu].menu}
                    onClick={secondaryMenus[store.primaryMenu].onClick}
                    secondaryMenu
                    activeItem={secondaryMenus[store.primaryMenu].activeItem}
                    menuSelected={store.primaryMenu}
                />
            </Container>
        </ThemeProvider>
    );
}

export default observer(App);
