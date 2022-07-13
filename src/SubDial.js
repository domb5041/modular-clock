import React from "react";
import WorldClock from "./complications/WorldClock";
import Seconds from "./complications/Seconds";
import Temperature from "./complications/Temperature";
import SunDial from "./complications/SunDial";
import { observer } from "mobx-react";
import store from "./store/store";
import { SubDial, SubDialHighlight } from "./Dials.styled";

function _SubDial({ position }) {
    const complications = {
        "world-clock": <WorldClock position={position} />,
        temperature: <Temperature />,
        "sun-dial": <SunDial />,
        seconds: <Seconds />
    };
    return (
        <SubDial position={position} primaryMenu={store.primaryMenu}>
            <SubDialHighlight primaryMenu={store.primaryMenu} position={position} />
            {complications[store.subDial[position].currentlyVisible]}
        </SubDial>
    );
}

export default observer(_SubDial);
