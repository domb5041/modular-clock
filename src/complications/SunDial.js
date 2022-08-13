import React from "react";
import Ticks from "../Ticks";
import { SubMinuteHand, SubHandsCap } from "../Hands.styled";
import { observer } from "mobx-react";
import { useStores } from "../store";
import { DialBackground } from "../SubDial";
import { transformHands } from "../utilityFunctions";

function SunDial({ clock }) {
    const { tickStore, clockStore } = useStores();

    return (
        <DialBackground color={clock.clockColor}>
            <Ticks clock={clock} tickData={tickStore.sunDialTickData(clock)} />
            <SubMinuteHand style={transformHands(clockStore.time[0] / 2, 180)} />
            <SubHandsCap />
        </DialBackground>
    );
}

export default observer(SunDial);
