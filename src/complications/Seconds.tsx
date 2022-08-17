import React, { FC } from "react";
import Ticks from "../Ticks";
import { SubSecondHand, SubHandsCap } from "../Hands.styled";
import { observer } from "mobx-react";
import { useStores } from "../store";
import { DialBackground } from "../SubDial";
import { transformHands } from "../utilityFunctions";
import { IClock } from "../sharedTypes";

const Seconds: FC<{ clock: IClock }> = ({ clock }) => {
    const { tickStore, clockStore } = useStores();

    return (
        <DialBackground color={clock.clockColor}>
            <Ticks clock={clock} tickData={tickStore.secondsTickData(clock)} />
            <SubSecondHand style={transformHands(clockStore.time[2])} color={clock.clockColor} />
            <SubHandsCap />
        </DialBackground>
    );
};

export default observer(Seconds);
