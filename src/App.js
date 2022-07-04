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
    return (
        <ThemeProvider theme={theme(clockColor)}>
            <Container>
                <Menu
                    activeItem={"colour"}
                    menu={[
                        { name: "style" },
                        { name: "colour" },
                        { name: "left dial" },
                        { name: "right dial" },
                        { name: "bottom dial" }
                    ]}
                />
                <MenuConnector />
                <MainDial />
                <MenuConnector />
                <Menu menu={swatches} noMenuKeys onClick={(c) => setClockColor(c)} reverse activeItem={clockColor} />
            </Container>
        </ThemeProvider>
    );
}
