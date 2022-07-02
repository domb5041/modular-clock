import React from "react";
import styled from "styled-components";
import { swatches, colorsDef } from "./theme";

const Container = styled.div`
    padding: 10px;
`;

const SwatchRow = styled.div`
    display: flex;
    align-items: center;
    padding: 2px 0;
`;

const Swatch = styled.div`
    width: 30px;
    height: 30px;
    background-color: ${(props) => colorsDef[props.color].base};
    border-radius: 100%;
    border: 3px solid ${(props) => (props.color === props.clockColor ? "white" : "transparent")};
    transition: 0.2s;
    cursor: pointer;
    margin-right: 5px;
    &:hover {
        transform: scale(1.1);
    }
`;

const Label = styled.div`
    text-transform: uppercase;
    pointer-events: none;
`;

export default function Swatches({ clockColor, setClockColor }) {
    return (
        <Container>
            {swatches.map((s, i) => (
                <SwatchRow>
                    <Swatch key={i} color={s} clockColor={clockColor} onClick={() => setClockColor(s)} />
                    <Label>{s}</Label>
                </SwatchRow>
            ))}
        </Container>
    );
}
