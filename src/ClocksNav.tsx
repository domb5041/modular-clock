import styled from "styled-components";
import { observer } from "mobx-react";
import { SubHourHand, SubMinuteHand, SubSecondHand, SubHandsCap } from "./Hands.styled";
import { ITickProps, Tick } from "./Ticks";
import { transparentize } from "polished";
import { useStores } from "./store";

const Clocks = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    border-right: 1px solid ${transparentize(0.8, "white")};
    height: 100%;
    overflow-y: auto;
`;

const SelectRing = styled.div<{ active: boolean }>`
    width: 150px;
    height: 150px;
    border: 3px solid ${(props) => (props.active ? "white" : "transparent")};
    padding: 5px;
    border-radius: 100%;
    margin: 0 5px 4px 5px;
    transition: 0.2s;
    flex-shrink: 0;
    cursor: pointer;
    &:hover {
        border-color: ${(props) => (props.active ? "white" : transparentize(0.7, "white"))};
    }
`;

const ClockIcon = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid ${(props) => props.theme.colors[props.color].base};
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors[props.color].subDial};
    border-radius: 100%;
    transition: 0.2s;
    position: relative;
`;

const MicroHourHand = styled(SubHourHand)`
    transform: translateX(-50%) rotate(-50deg);
    height: 40px;
    width: 7px;
    background-color: ${(props) => props.theme.colors[props.color].base};
`;
const MicroMinuteHand = styled(SubMinuteHand)`
    transform: translateX(-50%) rotate(50deg);
    height: 65px;
    background-color: ${(props) => props.theme.colors[props.color].base};
`;
const MicroSecondHand = styled(SubSecondHand)`
    transform: translateX(-50%) rotate(180deg);
    height: 65px;
    width: 3px;
    background-color: ${(props) => props.theme.colors[props.color].secondHand};
`;
const MicroHandsCap = styled(SubHandsCap)`
    background-color: ${(props) => props.theme.colors[props.color].base};
`;

const MicroDial = styled.div`
    width: 42px;
    height: 42px;
    position: absolute;
    border-radius: 100%;
    background-color: ${(props) => transparentize(0.5, props.theme.colors[props.color].base)};
    &.topDial {
        top: 35px;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    &.leftDial {
        left: 35px;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &.rightDial {
        right: 35px;
        top: 50%;
        transform: translate(50%, -50%);
    }
    &.bottomDial {
        bottom: 35px;
        left: 50%;
        transform: translate(-50%, 50%);
    }
`;

const MicroTick = styled(Tick)`
    & .tick-marker {
        background-color: ${(props) => props.theme.colors[props.color].base};
    }
`;

const AddClock = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 100%;
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${transparentize(0.85, "white")};
    & > svg {
        fill: ${transparentize(0.4, "white")};
        width: 50px;
        height: 50px;
    }
`;

function ClocksNav() {
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
                const { topDial, leftDial, rightDial, bottomDial } = c.subDial;
                return (
                    <SelectRing active={c.id === clockStore.activeClock} key={i}>
                        <ClockIcon key={c.id} onClick={() => clockStore.setActiveClock(c.id)} color={c.clockColor}>
                            {tickData.map((tick, i) => (
                                <MicroTick tick={tick as ITickProps} key={i} color={c.clockColor}>
                                    <div className="tick-marker" />
                                </MicroTick>
                            ))}
                            {topDial.currentlyVisible !== "none" && topDial.currentlyVisible !== "monogram" && (
                                <MicroDial color={c.clockColor} className="topDial" />
                            )}
                            {leftDial.currentlyVisible !== "none" && (
                                <MicroDial color={c.clockColor} className="leftDial" />
                            )}
                            {rightDial.currentlyVisible !== "none" && (
                                <MicroDial color={c.clockColor} className="rightDial" />
                            )}
                            {bottomDial.currentlyVisible !== "none" && (
                                <MicroDial color={c.clockColor} className="bottomDial" />
                            )}
                            <MicroHourHand color={c.clockColor} />
                            <MicroMinuteHand color={c.clockColor} />
                            <MicroSecondHand color={c.clockColor} />
                            <MicroHandsCap color={c.clockColor} />
                        </ClockIcon>
                    </SelectRing>
                );
            })}
            <SelectRing active={false}>
                <AddClock onClick={clockStore.addNewClock}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                    </svg>
                </AddClock>
            </SelectRing>
        </Clocks>
    );
}

export default observer(ClocksNav);
