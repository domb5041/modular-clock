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

const NightArea = styled.svg`
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    fill: ${transparentize(0.6, "black")};
`;

const SunIcon = styled.svg`
    position: absolute;
    top: 4.5rem;
    left: 50%;
    transform: translateX(-50%);
    fill: ${(props) => props.theme.colors[props.color].base};
    width: 2rem;
    height: 2rem;
`;

const MoonIcon = styled(SunIcon)`
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

    const sunIcon = (
        <SunIcon color={clock.clockColor} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path>
        </SunIcon>
    );

    const moonIcon = (
        <MoonIcon color={clock.clockColor} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9.5 4c4.41 0 8 3.59 8 8s-3.59 8-8 8c-.34 0-.68-.02-1.01-.07 1.91-2.16 3.01-4.98 3.01-7.93s-1.1-5.77-3.01-7.93C8.82 4.02 9.16 4 9.5 4m0-2c-1.82 0-3.53.5-5 1.35 2.99 1.73 5 4.95 5 8.65s-2.01 6.92-5 8.65c1.47.85 3.18 1.35 5 1.35 5.52 0 10-4.48 10-10S15.02 2 9.5 2z"></path>{" "}
        </MoonIcon>
    );

    return (
        <DialBackground color={clock.clockColor}>
            <NightArea viewBox="0 0 100 100">
                <path d={nightArea} />
            </NightArea>
            <Ticks clock={clock} tickData={tickStore.sunDialTickData(clock) as ITickProps[]} />
            {sunIcon}
            {moonIcon}
            <SubMinuteHand style={transformHands(clockStore.time[0] / 2, 180)} />
            <SubHandsCap />
        </DialBackground>
    );
};

export default observer(SunDial);
