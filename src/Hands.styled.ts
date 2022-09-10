import styled from "styled-components";
import { colorTransition } from "./theme";

export const Hand = styled.div<{ focusingOnSubDial?: boolean }>`
    position: absolute;
    background-color: ${(props) => props.theme.colors[props.color].hands};
    bottom: 50%;
    left: 50%;
    transform-origin: center bottom;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.7);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: background-color ${colorTransition}, opacity 0.2s;
`;

export const HourHand = styled(Hand)`
    width: 1.5rem;
    height: 16rem;
    opacity: ${(props) => (props.focusingOnSubDial ? 0 : 1)};
`;

export const MinuteHand = styled(Hand)`
    width: 1rem;
    height: 23rem;
    opacity: ${(props) => (props.focusingOnSubDial ? 0 : 1)};
`;

export const SecondHand = styled(Hand)`
    width: 0.5rem;
    height: 23rem;
    background-color: ${(props) => props.theme.colors[props.color].secondHand};
    opacity: ${(props) => (props.focusingOnSubDial ? 0 : 1)};
`;

export const SubHourHand = styled(Hand)`
    width: 0.8rem;
    height: 5rem;
`;

export const SubMinuteHand = styled(Hand)`
    width: 0.6rem;
    height: 8rem;
`;

export const SubSecondHand = styled(Hand)`
    width: 0.5rem;
    height: 8rem;
    background-color: ${(props) => props.theme.colors[props.color].secondHand};
`;

export const HandsCap = styled.div`
    position: absolute;
    background-color: ${(props) => props.theme.colors[props.color].hands};
    top: 50%;
    left: 50%;
    width: 2rem;
    height: 2rem;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.7);
    transition: background-color ${colorTransition};
`;

export const SubHandsCap = styled(HandsCap)`
    width: 1.3rem;
    height: 1.3rem;
`;
