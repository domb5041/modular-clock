import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import axios from "axios";
import Ticks, { ITickProps } from "../Ticks";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import styled from "styled-components";
import { DialBackground } from "../SubDial";
import { IClock } from "../sharedTypes";

export const City = styled.div`
    color: ${(props) => props.theme.colors[props.color].text};
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    bottom: 0;
    font-size: 1.2rem;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
`;

const Letter = styled.div<{ rotation: number }>`
    position: absolute;
    top: 0;
    left: 50%;
    transform-origin: center top;
    width: 2rem;
    height: 100%;
    transform: ${(props) => `translateX(-50%) rotate(${props.rotation}deg)`};
    & .letter {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0.4rem;
    }
`;

const CurrentTemp = styled.div`
    position: absolute;
    bottom: 4rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.8rem;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
    color: ${(props) => props.theme.colors[props.color].text};
`;

const MinTemp = styled.div`
    position: absolute;
    top: 50%;
    left: 2.2rem;
    transform: translateY(-50%);
    font-size: 1.4rem;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
    color: ${(props) => props.theme.colors[props.color].text};
`;

const MaxTemp = styled(MinTemp)`
    left: auto;
    right: 2.2rem;
`;

export const ticks = [
    { deg: 0, type: "subLong" },
    { deg: 30, type: "sub" },
    { deg: 60, type: "sub" },
    { deg: 90, type: "sub" },
    { deg: 270, type: "sub" },
    { deg: 300, type: "sub" },
    { deg: 330, type: "sub" }
];

const Temperature: FC<{ clock: IClock }> = ({ clock }) => {
    const [temp, setTemp] = useState(null);
    const [tempMinMax, setTempMinMax] = useState(null);
    const [latLon, setLatLon] = useState(null);
    const [location, setLocation] = useState(null);

    const transformTempToDegrees = () => {
        if (!tempMinMax || !latLon || !temp) {
            return {
                transform: "translateX(-50%) rotate(0deg)"
            };
        }
        const range = tempMinMax[1] - tempMinMax[0];
        const degrees = (temp - tempMinMax[0]) * (180 / range) - 90;
        return {
            transform: `translateX(-50%) rotate(${degrees}deg)`
        };
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatLon([position.coords.latitude, position.coords.longitude]);
            },
            (error) => console.log(error.message)
        );
    }, []);

    useEffect(() => {
        if (latLon) {
            getTemperature();
            const timeInterval = setInterval(getTemperature, 60000);
            return () => {
                clearInterval(timeInterval);
            };
        }
    }, [latLon]);

    const getTemperature = () => {
        axios({
            method: "get",
            url: `/temperature?lat=${latLon[0]}&lon=${latLon[1]}`
        }).then((res) => {
            setTemp(res.data.current.temp_c);
            const { day } = res.data.forecast.forecastday[0];
            setTempMinMax([Math.round(day.mintemp_c), Math.round(day.maxtemp_c)]);
            setLocation(res.data.location.name);
        });
    };

    const formatLocation = () => {
        const letters = location ? location.split("") : ["-"];
        const lettersCount = letters.length - 1;
        const spacing = 11;
        const offset = (lettersCount * spacing) / 2;

        const formattedLetters = letters.map((letter: string, i: number) => (
            <Letter key={i} rotation={i * -spacing + offset}>
                <div className="letter">{letter}</div>
            </Letter>
        ));
        return formattedLetters;
    };

    return (
        <DialBackground color={clock.clockColor}>
            <Ticks clock={clock} tickData={ticks as ITickProps[]} />
            <MinTemp color={clock.clockColor}>L:{tempMinMax ? tempMinMax[0] : "--"}</MinTemp>
            <CurrentTemp color={clock.clockColor}>{temp || "--"}°C</CurrentTemp>
            <MaxTemp color={clock.clockColor}>H:{tempMinMax ? tempMinMax[1] : "--"}</MaxTemp>
            <City color={clock.clockColor}>{formatLocation()}</City>
            <SubSecondHand style={transformTempToDegrees()} color={clock.clockColor} />
            <SubHandsCap />
        </DialBackground>
    );
};

export default observer(Temperature);
