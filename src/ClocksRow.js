import styled, { css } from "styled-components";
import { observer } from "mobx-react";
import { colorsDef } from "./theme";
import { SubHourHand, SubMinuteHand, SubSecondHand, SubHandsCap } from "./Hands.styled";
import { Tick } from "./Ticks.styled";
import { transparentize } from "polished";
import { useStores } from "./store";

const Clocks = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SelectRing = styled.div`
    width: 150px;
    height: 150px;
    border: 2px solid ${(props) => (props.active ? "white" : "transparent")};
    padding: 10px;
    border-radius: 100%;
    margin: 0 10px;
    transition: 0.2s;
    flex-shrink: 0;
`;

const ClockIcon = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid ${(props) => colorsDef[props.color].base};
    box-sizing: border-box;
    background-color: ${(props) => colorsDef[props.color].subDial};
    border-radius: 100%;
    cursor: pointer;
    transition: 0.2s;
    position: relative;
    &:hover {
        transform: scale(1.05);
    }
`;

const MicroHourHand = styled(SubHourHand)`
    transform: translateX(-50%) rotate(-50deg);
    height: 40px;
    width: 7px;
    background-color: ${(props) => colorsDef[props.color].base};
`;
const MicroMinuteHand = styled(SubMinuteHand)`
    transform: translateX(-50%) rotate(50deg);
    height: 65px;
    background-color: ${(props) => colorsDef[props.color].base};
`;
const MicroSecondHand = styled(SubSecondHand)`
    transform: translateX(-50%) rotate(180deg);
    height: 65px;
    width: 3px;
    background-color: ${(props) => colorsDef[props.color].secondHand};
`;
const MicroHandsCap = styled(SubHandsCap)`
    background-color: ${(props) => colorsDef[props.color].base};
`;

const MicroDial = styled.div`
    width: 42px;
    height: 42px;
    position: absolute;
    border-radius: 100%;
    background-color: ${(props) => transparentize(0.5, colorsDef[props.color].base)};
    ${(props) =>
        (props.position === "topDial" &&
            css`
                top: 35px;
                left: 50%;
                transform: translate(-50%, -50%);
            `) ||
        (props.position === "leftDial" &&
            css`
                left: 35px;
                top: 50%;
                transform: translate(-50%, -50%);
            `) ||
        (props.position === "rightDial" &&
            css`
                right: 35px;
                top: 50%;
                transform: translate(50%, -50%);
            `) ||
        (props.position === "bottomDial" &&
            css`
                bottom: 35px;
                left: 50%;
                transform: translate(-50%, 50%);
            `)};
`;

const MicroTick = styled(Tick)`
    & .tick-marker {
        background-color: ${(props) => colorsDef[props.color].base};
    }
`;

function ClocksRow() {
    const { clockStore } = useStores();
    const tickData = [
        { deg: 0, type: "subShort" },
        { deg: 30, type: "subShort" },
        { deg: 60, type: "subShort" },
        { deg: 90, type: "subShort" },
        { deg: 120, type: "subShort" },
        { deg: 150, type: "subShort" },
        { deg: 180, type: "subShort" },
        { deg: 210, type: "subShort" },
        { deg: 240, type: "subShort" },
        { deg: 270, type: "subShort" },
        { deg: 300, type: "subShort" },
        { deg: 330, type: "subShort" }
    ];
    return (
        <Clocks>
            {clockStore.clocks.map((c, i) => {
                const { topDial, leftDial, rightDial, bottomDial } = clockStore.clocks[i].subDial;
                return (
                    <SelectRing active={c.id === clockStore.activeClock} key={i}>
                        <ClockIcon key={c.id} onClick={() => clockStore.setActiveClock(c.id)} color={c.clockColor}>
                            {tickData.map((tick, i) => (
                                <MicroTick tick={tick} key={i} color={c.clockColor}>
                                    <div className="tick-marker" />
                                </MicroTick>
                            ))}
                            {topDial.currentlyVisible !== "none" && topDial.currentlyVisible !== "monogram" && (
                                <MicroDial color={c.clockColor} position="topDial" />
                            )}
                            {leftDial.currentlyVisible !== "none" && (
                                <MicroDial color={c.clockColor} position="leftDial" />
                            )}
                            {rightDial.currentlyVisible !== "none" && (
                                <MicroDial color={c.clockColor} position="rightDial" />
                            )}
                            {bottomDial.currentlyVisible !== "none" && (
                                <MicroDial color={c.clockColor} position="bottomDial" />
                            )}
                            <MicroHourHand color={c.clockColor} />
                            <MicroMinuteHand color={c.clockColor} />
                            <MicroSecondHand color={c.clockColor} />
                            <MicroHandsCap color={c.clockColor} />
                        </ClockIcon>
                    </SelectRing>
                );
            })}
        </Clocks>
    );
}

export default observer(ClocksRow);
