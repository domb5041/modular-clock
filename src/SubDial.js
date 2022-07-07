import React from "react";
import WorldClock from "./complications/WorldClock";
import Seconds from "./complications/Seconds";
import Temperature from "./complications/Temperature";
import SunDial from "./complications/SunDial";

function SubDial({ dialId, timezone, dial }) {
    const complications = {
        "world-clock": <WorldClock dialId={dialId} timezone={timezone} />,
        temperature: <Temperature dialId={dialId} />,
        "sun-dial": <SunDial dialId={dialId} />,
        seconds: <Seconds dialId={dialId} />
    };
    return complications[dial];
}

export default SubDial;
