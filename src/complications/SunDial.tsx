import React, { FC, useEffect, useState } from "react";
import Ticks, { ITickProps } from "../Ticks";
import { SubMinuteHand, SubHandsCap } from "../Hands.styled";
import { observer } from "mobx-react";
import { useStores } from "../store";
import { DialBackground } from "../SubDial";
import { transformHands } from "../utilityFunctions";
import { IClock } from "../sharedTypes";
import styled from "styled-components";
import { transparentize } from "polished";
import { colorTransition, theme } from "../theme";
import Symbol from "../Symbol";

const NightArea = styled.svg`
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    fill: ${transparentize(0.6, "black")};
`;

const SunSymbol = styled(Symbol)`
    position: absolute;
    top: 4.5rem;
    left: 50%;
    transform: translateX(-50%);
    transition: color ${colorTransition};
`;

const MoonSymbol = styled(SunSymbol)`
    top: auto;
    bottom: 4.5rem;
`;

const SunDial: FC<{ clock: IClock }> = ({ clock }) => {
    const { tickStore, clockStore, weatherStore } = useStores();
    const [nightArea, setNightArea] = useState("");

    useEffect(() => {
        const drawNightArea = (sunrise: string, sunset: string) => {
            const centreX = 50;
            const centreY = 50;
            const radius = 50;
            const startAngle = convertToDegrees(sunset);
            const endAngle = convertToDegrees(sunrise) - startAngle;
            const startAngleRad = startAngle * (Math.PI / 180);
            const endAngleRad = endAngle * (Math.PI / 180);

            const firstCircumferenceX = centreX + radius * Math.cos(startAngleRad);
            const firstCircumferenceY = centreY + radius * Math.sin(startAngleRad);
            const secondCircumferenceX = centreX + radius * Math.cos(startAngleRad + endAngleRad);
            const secondCircumferenceY = centreY + radius * Math.sin(startAngleRad + endAngleRad);

            let d = "";
            // move to centre
            d += "M" + centreX + "," + centreY + " ";
            // line to first edge
            d += "L" + firstCircumferenceX + "," + firstCircumferenceY + " ";
            // arc
            // Radius X, Radius Y, X Axis Rotation, Large Arc Flag, Sweep Flag, End X, End Y
            d += "A" + radius + "," + radius + " 0 0,1 " + secondCircumferenceX + "," + secondCircumferenceY + " ";
            // close path
            d += "Z";
            setNightArea(d);
        };
        if (weatherStore.weather) {
            const { astro } = weatherStore.weather.forecast.forecastday[0];
            drawNightArea(astro.sunrise, astro.sunset);
        }
    }, [weatherStore.weather]);

    const convertToDegrees = (string: string) => {
        const array = string.split(/:|\s/);
        const hour = Number(array[0]);
        const isPM = array[2] === "PM";
        const hour24 = isPM ? hour + 12 : hour;
        const hour24toMins = hour24 * 60;
        const mins = Number(array[1]);
        const degrees = (hour24toMins + mins) * (360 / 1440) + 90;
        return degrees;
    };

    return (
        <DialBackground color={clock.clockColor}>
            <NightArea viewBox="0 0 100 100">
                <path d={nightArea} />
            </NightArea>
            <Ticks clock={clock} tickData={tickStore.sunDialTickData(clock) as ITickProps[]} />
            <SunSymbol name="light_mode" color={theme.colors[clock.clockColor].base} size="2rem" />
            <MoonSymbol name="mode_night" color={theme.colors[clock.clockColor].base} size="2rem" />
            <SubMinuteHand color={clock.clockColor} style={transformHands(clockStore.time[0] / 2, 180)} />
            <SubHandsCap color={clock.clockColor} />
        </DialBackground>
    );
};

export default observer(SunDial);
