import MainDial from "./MainDial";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme, swatches } from "./theme";
import Menu from "./Menu";
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
    const primaryMenuOptions = [
        { id: "colour", name: "colour" },
        { id: "leftDial", name: "left dial" },
        { id: "rightDial", name: "right dial" },
        { id: "bottomDial", name: "bottom dial" }
    ];

    const timezones = {
        paris: 1,
        tokyo: 9,
        "new delhi": 5.5
    };

    const subDialMenuKey = {
        zone: {
            left: store.leftDialZone,
            right: store.rightDialZone,
            bottom: store.bottomDialZone
        },
        setZone: {
            left: (city) => store.setLeftDialZone({ city: city, offset: timezones[city] }),
            right: (city) => store.setRightDialZone({ city: city, offset: timezones[city] }),
            bottom: (city) => store.setBottomDialZone({ city: city, offset: timezones[city] })
        }
    };

    const subDialMenu = (dial) => [
        {
            id: "world-clock",
            name: "world clock",
            options: [
                {
                    id: "timezone-selector",
                    type: "dropdown",
                    value: subDialMenuKey.zone[dial].city,
                    list: Object.keys(timezones),
                    label: "city",
                    onChange: subDialMenuKey.setZone[dial]
                }
            ]
        },
        { id: "temperature", name: "temperature" },
        { id: "sun-dial", name: "sunrise sunset" },
        { id: "seconds", name: "seconds" }
    ];

    const secondaryMenus = {
        colour: { menu: swatches, onClick: (c) => store.setClockColor(c), activeItem: store.clockColor },
        leftDial: { menu: subDialMenu("left"), onClick: (c) => store.setLeftDial(c), activeItem: store.leftDial },
        rightDial: { menu: subDialMenu("right"), onClick: (c) => store.setRightDial(c), activeItem: store.rightDial },
        bottomDial: {
            menu: subDialMenu("bottom"),
            onClick: (c) => store.setBottomDial(c),
            activeItem: store.bottomDial
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
