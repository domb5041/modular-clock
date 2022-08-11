import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import axios from "axios";
import { Tick } from "../Ticks.styled";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import styled from "styled-components";
import { theme } from "../theme";
import { DialBackground } from "../SubDial";

export const City = styled.div`
    color: ${(props) => props.theme.text};
    text-transform: uppercase;
    position: absolute;
    bottom: 5.2rem;
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
`;

const CurrentTemp = styled.div`
    position: absolute;
    bottom: 2.4rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.8rem;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
    color: ${(props) => props.theme.text};
`;

const MinTemp = styled.div`
    position: absolute;
    top: 50%;
    left: 2.2rem;
    transform: translateY(-50%);
    font-size: 1.4rem;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0.7);
    color: ${(props) => props.theme.text};
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
    { deg: 180, type: "sub" },
    { deg: 270, type: "sub" },
    { deg: 300, type: "sub" },
    { deg: 330, type: "sub" }
];

function Temperature({ clock }) {
    const [temp, setTemp] = useState(0);
    const [tempMinMax, setTempMinMax] = useState([0, 0]);
    const [latLon, setLatLon] = useState([0, 0]);
    const [location, setLocation] = useState("");

    const transformTempToDegrees = () => {
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
        if (latLon !== [0, 0]) {
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
            url: `http://api.weatherapi.com/v1/forecast.json`,
            params: {
                key: "d828e01ddaf34e14a8e151445221207",
                q: `${latLon[0]},${latLon[1]}`
            }
        }).then((res) => {
            setTemp(res.data.current.temp_c);
            const { day } = res.data.forecast.forecastday[0];
            setTempMinMax([Math.round(day.mintemp_c), Math.round(day.maxtemp_c)]);
            setLocation(res.data.location.name);
        });
    };

    return (
        <DialBackground color={clock.clockColor}>
            {ticks.map((tick, i) => (
                <Tick tick={tick} key={i}>
                    <div className="tick-marker" style={{ backgroundColor: theme[clock.clockColor].ticks }} />
                </Tick>
            ))}
            <MinTemp>L:{tempMinMax[0]}</MinTemp>
            <CurrentTemp>{temp}°C</CurrentTemp>
            <MaxTemp>H:{tempMinMax[1]}</MaxTemp>
            <City>{location}</City>
            <SubSecondHand style={transformTempToDegrees()} color={clock.clockColor} />
            <SubHandsCap />
        </DialBackground>
    );
}

export default observer(Temperature);
