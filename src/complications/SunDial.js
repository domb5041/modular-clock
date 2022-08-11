import React, { useState, useEffect } from "react";
import { Tick } from "../Ticks.styled";
import { SubMinuteHand, SubHandsCap } from "../Hands.styled";
import { theme } from "../theme";
import moment from "moment";
import { observer } from "mobx-react";
import { useStores } from "../store";
import { DialBackground } from "../SubDial";

function SunDial({ clock }) {
    const { tickStore } = useStores();
    const [hour, setHour] = useState(0);

    useEffect(() => {
        const timeInterval = setInterval(handleSetTime, 1000);
        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    const handleSetTime = () => {
        setHour(timeToDegrees());
    };

    const timeToDegrees = () => {
        const d = moment();

        const hrsToSeconds = d.hours() * 3600;
        const minsToSeconds = d.minutes() * 60;
        const seconds = d.seconds();

        const hrsToDeg = (hrsToSeconds + minsToSeconds + seconds) * (360 / 86400);

        return hrsToDeg;
    };

    const transformHands = (hand) => ({
        transform: `translateX(-50%) rotate(${hand + 180}deg)`
    });

    return (
        <DialBackground color={clock.clockColor}>
            {tickStore.sunDialTickData(clock).map((tick, i) => (
                <Tick tick={tick} key={i}>
                    <div className="tick-marker" style={{ backgroundColor: theme[clock.clockColor].ticks }} />
                    {tick.number && <div className="tick-number">{tick.number}</div>}
                </Tick>
            ))}
            <SubMinuteHand style={transformHands(hour)} />
            <SubHandsCap />
        </DialBackground>
    );
}

export default observer(SunDial);
