import React from "react";
import WorldClock from "./complications/WorldClock";
import Seconds from "./complications/Seconds";
import Temperature from "./complications/Temperature";
import SunDial from "./complications/SunDial";
import { observer } from "mobx-react";
import store from "./store/store";

function SubDial({ position }) {
    const complications = {
        "world-clock": <WorldClock position={position} />,
        temperature: <Temperature position={position} />,
        "sun-dial": <SunDial position={position} />,
        seconds: <Seconds position={position} />
    };
    return complications[store.subDial[position].currentlyVisible];
}

export default observer(SubDial);
