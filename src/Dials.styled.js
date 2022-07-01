import styled, { css } from "styled-components";

export const MainDial = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 100%;
    border: 4px solid ${(props) => props.theme.base};
    position: relative;
    background-image: radial-gradient(transparent, ${(props) => props.theme.dialInner});
    box-shadow: 0 0 140px ${(props) => props.theme.dialOuter};
    flex-shrink: 0;
`;

export const SubDial = styled.div`
    width: 180px;
    height: 180px;
    border-radius: 100%;
    border: 2px solid ${(props) => props.theme.base};
    position: absolute;
    background-color: ${(props) => props.theme.subDial};
    ${(props) =>
        (props.position === "left" &&
            css`
                left: 15px;
                top: 50%;
                transform: translateY(-50%);
            `) ||
        (props.position === "right" &&
            css`
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
            `) ||
        (props.position === "bottom" &&
            css`
                bottom: 15px;
                left: 50%;
                transform: translateX(-50%);
            `)}
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
`;

export const Hand = styled.div`
    position: absolute;
    background-color: ${(props) => props.color || "white"};
    bottom: 50%;
    left: 50%;
    transform-origin: center bottom;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    width: ${(props) => props.size[0]}px;
    height: ${(props) => props.size[1]}px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const Cap = styled.div`
    position: absolute;
    background-color: white;
    top: 50%;
    left: 50%;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
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
    & > div {
        background-color: ${(props) => props.theme.base};
        width: 100%;
        height: ${(props) => tickDimensions[props.tick.type].height};
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;
