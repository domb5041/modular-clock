import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import axios from "axios";
import Ticks, { ITickProps } from "../Ticks";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import styled from "styled-components";
import { DialBackground } from "../SubDial";
import { IClock } from "../sharedTypes";
import { useStores } from "../store";

export const City = styled.div`
    color: ${(props) => props.theme.colors[props.color].base};
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
    bottom: 4.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.4rem;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
    color: ${(props) => props.theme.colors[props.color].text};
`;

const Temperature: FC<{ clock: IClock }> = ({ clock }) => {
    const { tickStore } = useStores();
    const [temp, setTemp] = useState(0);
    const [tempMin, setTempMin] = useState(0);
    const [tempMax, setTempMax] = useState(10);
    const [latLon, setLatLon] = useState(null);
    const [location, setLocation] = useState(null);

    const transformTempToDegrees = () => {
        const range = tempMax - tempMin;
        const degrees = (temp - tempMin) * (220 / range) - 110;
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
            const timeInterval = setInterval(getTemperature, 1000 * 60 * 5);
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
            setTempMin(Math.round(day.mintemp_c));
            setTempMax(Math.round(day.maxtemp_c));
            setLocation(res.data.location.name);
        });
    };

    const formatLocation = () => {
        const letters = location ? location.split("") : "location".split("");
        const maxLength = 12;
        if (letters.length > maxLength) letters.length = maxLength;
        const lettersCount = letters.length - 1;
        const spacing = 9;
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
            <Ticks
                clock={clock}
                tickData={tickStore.temperatureDialTickData(clock, tempMin, tempMax) as ITickProps[]}
            />
            <CurrentTemp color={clock.clockColor}>{temp}°C</CurrentTemp>
            <City color={clock.clockColor}>{formatLocation()}</City>
            <SubSecondHand style={transformTempToDegrees()} color={clock.clockColor} />
            <SubHandsCap color={clock.clockColor} />
        </DialBackground>
    );
};

export default observer(Temperature);
