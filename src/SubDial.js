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
        seconds: <Seconds />,
        none: null
    };
    return (
        <>
            <SubDial
                position={position}
                primaryMenu={store.primaryMenu}
                isHidden={store.subDial[position].currentlyVisible === "none"}
            >
                {complications[store.subDial[position].currentlyVisible]}
            </SubDial>
            <SubDialHighlight primaryMenu={store.primaryMenu} position={position} />
        </>
    );
}

export default observer(_SubDial);
