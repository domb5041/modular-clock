import styled from "styled-components";
import { colorTransition } from "./theme";

const tickDimensions = {
    hrLong: { width: "1rem", height: "30%" },
    hrShort: { width: "1rem", height: "4%", fontSize: "2.2rem", numberDistance: "1.8rem" },
    hr: { width: "0.7rem", height: "15%" },
    min: { width: "0.4rem", height: "4%" },
    sub: { width: "0.5rem", height: "15%", fontSize: "1.4rem" },
    subLong: { width: "0.5rem", height: "30%" },
    subShort: { width: "0.4rem", height: "10%", fontSize: "1.4rem", numberDistance: "1.4rem" }
};

export const Tick = styled.div`
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform-origin: center bottom;
    width: ${(props) => tickDimensions[props.tick.type].width};
    height: 50%;
    transform: ${(props) => `translateX(-50%) rotate(${props.tick.deg}deg)`};
    & > .tick-marker {
        width: 100%;
        height: ${(props) => tickDimensions[props.tick.type].height};
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
        transition: background-color ${colorTransition};
    }
    & > .tick-number {
        position: absolute;
        top: ${(props) => tickDimensions[props.tick.type].numberDistance};
        left: 50%;
        transform: ${(props) => `translateX(-50%) rotate(-${props.tick.deg}deg)`};
        font-size: ${(props) => tickDimensions[props.tick.type].fontSize};
        color: ${(props) => props.theme.text};
        text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
    }
`;
