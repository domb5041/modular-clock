import React, { useEffect, useState } from "react";
import * as styled from "../Dials.styled";
import { observer } from "mobx-react";
import store from "../store/store";
import axios from "axios";

function Temperature({ position }) {
    const [temp, setTemp] = useState(0);
    const [tempMinMax, setTempMinMax] = useState([0, 0]);
    const [latLon, setLatLon] = useState([0, 0]);
    const [location, setLocation] = useState("");

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
            console.log(res);
            setTemp(res.data.current.temp_c);
            const { day } = res.data.forecast.forecastday[0];
            setTempMinMax([day.mintemp_c, day.maxtemp_c]);
            setLocation(res.data.location.name);
        });
    };

    return (
        <styled.SubDial position={position} primaryMenu={store.primaryMenu}>
            <div>current: {temp}</div>
            <div>min: {tempMinMax[0]}</div>
            <div>max: {tempMinMax[1]}</div>
            <div>{location}</div>
        </styled.SubDial>
    );
}

export default observer(Temperature);
