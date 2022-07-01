import React from "react";
import styled from "styled-components";
import { swatches, colorsDef } from "./theme";

const Container = styled.div`
    padding: 10px;
`;

const Swatch = styled.div`
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.color};
    border-radius: 100%;
    border: 3px solid ${(props) => (props.color === props.clockColor ? "white" : "transparent")};
    transition: 0.2s;
    cursor: pointer;
    margin-bottom: 5px;
    &:hover {
        transform: scale(1.1);
    }
`;

export default function Swatches({ clockColor, setClockColor }) {
    return (
        <Container>
            {swatches.map((s, i) => (
                <Swatch key={i} color={colorsDef[s].base} clockColor={clockColor} onClick={() => setClockColor(s)} />
            ))}
        </Container>
    );
}
