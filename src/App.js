import MainDial from "./MainDial";
import styled from "styled-components";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme, swatches } from "./theme";
import Menu from "./Menu";

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

export default function App() {
    const [clockColor, setClockColor] = useState(swatches[0].id);
    const [primaryMenu, setPrimaryMenu] = useState("colour");
    const [leftDial, setLeftDial] = useState("world-clock");
    const [rightDial, setRightDial] = useState("world-clock");
    const [bottomDial, setBottomDial] = useState("world-clock");

    const primaryMenuOptions = [
        { id: "colour", name: "colour" },
        { id: "leftDial", name: "left dial" },
        { id: "rightDial", name: "right dial" },
        { id: "bottomDial", name: "bottom dial" }
    ];

    const subDialMenu = [
        {
            id: "world-clock",
            name: "world clock",
            options: [
                {
                    id: "timezone-selector",
                    type: "dropdown",
                    list: [
                        { name: "paris", value: 1 },
                        { name: "tokyo", value: 9 },
                        { name: "new dehli", value: 5.5 }
                    ],
                    label: "city"
                }
            ]
        },
        { id: "temperature", name: "temperature" },
        { id: "sun-dial", name: "sunrise sunset" },
        { id: "seconds", name: "seconds" }
    ];

    const secondaryMenus = {
        colour: { menu: swatches, onClick: (c) => setClockColor(c), activeItem: clockColor },
        leftDial: { menu: subDialMenu, onClick: (c) => setLeftDial(c), activeItem: leftDial },
        rightDial: { menu: subDialMenu, onClick: (c) => setRightDial(c), activeItem: rightDial },
        bottomDial: { menu: subDialMenu, onClick: (c) => setBottomDial(c), activeItem: bottomDial }
    };

    return (
        <ThemeProvider theme={theme(clockColor)}>
            <Container>
                <Menu activeItem={primaryMenu} menu={primaryMenuOptions} onClick={(c) => setPrimaryMenu(c)} />
                <MenuConnector />
                <MainDial
                    primaryMenu={primaryMenu}
                    clockColor={clockColor}
                    leftDial={leftDial}
                    rightDial={rightDial}
                    bottomDial={bottomDial}
                />
                <MenuConnector />
                <Menu
                    menu={secondaryMenus[primaryMenu].menu}
                    onClick={secondaryMenus[primaryMenu].onClick}
                    secondaryMenu
                    activeItem={secondaryMenus[primaryMenu].activeItem}
                    menuSelected={primaryMenu}
                />
            </Container>
        </ThemeProvider>
    );
}
