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
    const [clockColor, setClockColor] = useState(swatches[0]);
    const [primaryMenu, setPrimaryMenu] = useState("colour");

    const primaryMenuOptions = [
        { id: "colour", name: "colour" },
        { id: "leftDial", name: "left dial" },
        { id: "rightDial", name: "right dial" },
        { id: "bottomDial", name: "bottom dial" }
    ];

    const subDialMenu = ["world clock"];

    const secondaryMenus = {
        colour: { menu: swatches, noMenuKeys: true, onClick: (c) => setClockColor(c), activeItem: clockColor },
        leftDial: { menu: subDialMenu, noMenuKeys: true, onClick: null, activeItem: "world clock" },
        rightDial: { menu: subDialMenu, noMenuKeys: true, onClick: null, activeItem: "world clock" },
        bottomDial: { menu: subDialMenu, noMenuKeys: true, onClick: null, activeItem: "world clock" }
    };

    return (
        <ThemeProvider theme={theme(clockColor)}>
            <Container>
                <Menu activeItem={primaryMenu} menu={primaryMenuOptions} onClick={(c) => setPrimaryMenu(c)} />
                <MenuConnector />
                <MainDial primaryMenu={primaryMenu} clockColor={clockColor} />
                <MenuConnector />
                <Menu
                    menu={secondaryMenus[primaryMenu].menu}
                    noMenuKeys
                    onClick={secondaryMenus[primaryMenu].onClick}
                    reverse
                    activeItem={secondaryMenus[primaryMenu].activeItem}
                    menuSelected={primaryMenu}
                />
            </Container>
        </ThemeProvider>
    );
}
