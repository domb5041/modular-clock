import MainDial from "./MainDial";
import styled from "styled-components";
import Swatches from "./Swatches";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme, swatches } from "./theme";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

export default function App() {
    const [clockColor, setClockColor] = useState(swatches[0]);
    return (
        <ThemeProvider theme={theme(clockColor)}>
            <Container>
                <MainDial />
                <Swatches setClockColor={(c) => setClockColor(c)} clockColor={clockColor} />
            </Container>
        </ThemeProvider>
    );
}
