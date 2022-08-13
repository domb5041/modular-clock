import React, { useState, useEffect } from "react";
import Ticks from "../Ticks";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import { observer } from "mobx-react";
import { useStores } from "../store";
import moment from "moment";
import { DialBackground } from "../SubDial";

function Seconds({ clock }) {
    const { tickStore } = useStores();
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timeInterval = setInterval(handleSetTime, 1000);
        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    const handleSetTime = () => {
        setSeconds(timeToDegrees());
    };

    const timeToDegrees = () => {
        const s = moment().seconds();
        const secsToDeg = s * (360 / 60);
        return secsToDeg;
    };

    const transformHands = (hand) => ({
        transform: `translateX(-50%) rotate(${hand}deg)`
    });

    return (
        <DialBackground color={clock.clockColor}>
            <Ticks clock={clock} tickData={tickStore.secondsTickData(clock)} />
            <SubSecondHand style={transformHands(seconds)} color={clock.clockColor} />
            <SubHandsCap />
        </DialBackground>
    );
}

export default observer(Seconds);
