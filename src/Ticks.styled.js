import styled from "styled-components";
import { colorTransition } from "./theme";

const tickDimensions = {
    hrLong: { width: "1.9%", height: "30%" },
    hrShort: { width: "1.9%", height: "4%", fontSize: "22px", numberDistance: "18px" },
    hr: { width: "1.3%", height: "15%" },
    min: { width: "0.8%", height: "4%" },
    sub: { width: "2.5%", height: "15%", fontSize: "14px" },
    subLong: { width: "2.5%", height: "30%" },
    subShort: { width: "2%", height: "10%", fontSize: "14px", numberDistance: "14px" }
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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        transition: background-color ${colorTransition};
    }
    & > .tick-number {
        position: absolute;
        top: ${(props) => tickDimensions[props.tick.type].numberDistance};
        left: 50%;
        transform: ${(props) => `translateX(-50%) rotate(-${props.tick.deg}deg)`};
        font-size: ${(props) => tickDimensions[props.tick.type].fontSize};
        color: ${(props) => props.theme.text};
        text-shadow: 0 0 5px rgba(0, 0, 0.7);
    }
`;
