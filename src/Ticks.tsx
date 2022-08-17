import React, { FC } from "react";
import { theme } from "./theme";
import { observer } from "mobx-react";
import styled from "styled-components";
import { colorTransition } from "./theme";
import { IClock } from "./sharedTypes";

const tickDimensions = {
    hrLong: { width: "1rem", height: "30%", fontSize: "2.2rem", numberDistance: "1.8rem" },
    hrShort: { width: "1rem", height: "4%", fontSize: "2.2rem", numberDistance: "1.8rem" },
    hr: { width: "0.7rem", height: "15%", fontSize: "2.2rem", numberDistance: "1.8rem" },
    min: { width: "0.4rem", height: "4%", fontSize: "2.2rem", numberDistance: "1.8rem" },
    sub: { width: "0.5rem", height: "15%", fontSize: "1.4rem", numberDistance: "1.8rem" },
    subLong: { width: "0.5rem", height: "30%", fontSize: "2.2rem", numberDistance: "1.8rem" },
    subShort: { width: "0.4rem", height: "10%", fontSize: "1.4rem", numberDistance: "1.4rem" }
};

export interface ITickProps {
    type: keyof typeof tickDimensions;
    deg: number;
    number?: number;
}

export const Tick = styled.div<{ tick: ITickProps }>`
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
        text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
    }
`;

interface ITicksProps {
    clock: IClock;
    tickData: ITickProps[];
}

const Ticks: FC<ITicksProps> = ({ clock, tickData }) => {
    const { ticks, text } = theme.colors[clock.clockColor];

    return (
        tickData && (
            <>
                {tickData.map((tick, i) => (
                    <Tick key={i} tick={tick}>
                        <div className="tick-marker" style={{ backgroundColor: ticks }} />
                        {tick.number && (
                            <div className="tick-number" style={{ color: text }}>
                                {tick.number}
                            </div>
                        )}
                    </Tick>
                ))}
            </>
        )
    );
};

export default observer(Ticks);
