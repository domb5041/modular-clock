import { transparentize } from "polished";
import styled, { css } from "styled-components";

const colorTransition = "0.7s";

export const MainDial = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 100%;
    border: 4px solid ${(props) => props.theme.base};
    position: relative;
    background-color: ${(props) => props.theme.dialInner};
    transition: background-color ${colorTransition}, border ${colorTransition}, box-shadow ${colorTransition};
    flex-shrink: 0;
    overflow: hidden;
    & .main-dial-shade {
        width: 100%;
        height: 100%;
        background-image: radial-gradient(${transparentize(0.3, "black")}, transparent);
    }
`;

export const SubDial = styled.div`
    width: 180px;
    height: 180px;
    border-radius: 100%;
    border: 2px solid ${(props) => props.theme.base};
    position: absolute;
    background-color: ${(props) => props.theme.subDial};
    transition: background-color ${colorTransition}, border ${colorTransition}, opacity 0.2s;
    opacity: ${(props) => (props.isHidden ? 0 : 1)};
    ${(props) =>
        (props.position === "topDial" &&
            css`
                top: 105px;
                left: 50%;
                transform: translate(-50%, -50%);
            `) ||
        (props.position === "leftDial" &&
            css`
                left: 105px;
                top: 50%;
                transform: translate(-50%, -50%);
            `) ||
        (props.position === "rightDial" &&
            css`
                right: 105px;
                top: 50%;
                transform: translate(50%, -50%);
            `) ||
        (props.position === "bottomDial" &&
            css`
                bottom: 105px;
                left: 50%;
                transform: translate(-50%, 50%);
            `)};
`;

export const SubDialHighlight = styled(SubDial)`
    position: absolute;
    border: 4px solid white;
    width: 192px;
    height: 192px;
    transition: opacity 0.2s;
    opacity: ${(props) => (props.primaryMenu === props.position ? 1 : 0)};
    background-color: transparent;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

export const City = styled.div`
    color: ${(props) => props.theme.text};
    text-transform: uppercase;
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    letter-spacing: 2px;
    text-shadow: 0 0 5px rgba(0, 0, 0.7);
`;

export const AmPm = styled.div`
    color: ${(props) => props.theme.text};
    text-transform: uppercase;
    position: absolute;
    top: ${(props) => (props.subDial ? 40 : 90)}px;
    width: 100%;
    text-align: center;
    font-size: ${(props) => (props.subDial ? 12 : 20)}px;
    letter-spacing: 2px;
    text-shadow: 0 0 5px rgba(0, 0, 0.7);
`;

const tickDimensions = {
    hrLong: { width: "10px", height: "30%" },
    hrShort: { width: "10px", height: "4%" },
    hr: { width: "7px", height: "15%" },
    min: { width: "4px", height: "4%" },
    sub: { width: "5px", height: "15%" },
    subLong: { width: "5px", height: "30%" }
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
`;
