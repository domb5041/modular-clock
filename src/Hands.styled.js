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
    width: 2.5%;
    height: 35%;
    opacity: ${(props) => (props.focusingOnSubDial ? 0 : 1)};
`;

export const MinuteHand = styled(Hand)`
    width: 2.3%;
    height: 46%;
    opacity: ${(props) => (props.focusingOnSubDial ? 0 : 1)};
`;

export const SecondHand = styled(Hand)`
    width: 1.3%;
    height: 46%;
    background-color: ${(props) => props.theme.secondHand};
    opacity: ${(props) => (props.focusingOnSubDial ? 0 : 1)};
`;

export const SubHourHand = styled(Hand)`
    width: 3.7%;
    height: 35%;
`;

export const SubMinuteHand = styled(Hand)`
    width: 3.6%;
    height: 46%;
`;

export const SubSecondHand = styled(Hand)`
    width: 3%;
    height: 46%;
    background-color: ${(props) => props.theme.secondHand};
`;

export const HandsCap = styled.div`
    position: absolute;
    background-color: white;
    top: 50%;
    left: 50%;
    width: 4.2%;
    height: 4.2%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
`;

export const SubHandsCap = styled(HandsCap)`
    width: 6%;
    height: 6%;
`;
