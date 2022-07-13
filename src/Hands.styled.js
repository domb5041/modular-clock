import styled from "styled-components";

const colorTransition = "0.7s";

export const Hand = styled.div`
    position: absolute;
    background-color: white;
    bottom: 50%;
    left: 50%;
    transform-origin: center bottom;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: background-color ${colorTransition}, opacity 0.2s;
`;

export const HourHand = styled(Hand)`
    width: 15px;
    height: 160px;
    opacity: ${(props) => (props.focusingOnSubDial ? 0 : 1)};
`;

export const MinuteHand = styled(Hand)`
    width: 10px;
    height: 230px;
    opacity: ${(props) => (props.focusingOnSubDial ? 0 : 1)};
`;

export const SecondHand = styled(Hand)`
    width: 5px;
    height: 230px;
    background-color: ${(props) => props.theme.secondHand};
    opacity: ${(props) => (props.focusingOnSubDial ? 0 : 1)};
`;

export const SubHourHand = styled(Hand)`
    width: 8px;
    height: 50px;
`;

export const SubMinuteHand = styled(Hand)`
    width: 6px;
    height: 80px;
`;

export const SubSecondHand = styled(Hand)`
    width: 5px;
    height: 80px;
    background-color: ${(props) => props.theme.secondHand};
`;

export const HandsCap = styled.div`
    position: absolute;
    background-color: white;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
`;

export const SubHandsCap = styled(HandsCap)`
    width: 13px;
    height: 13px;
`;
