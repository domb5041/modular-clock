import React from "react";
import WorldClock from "./complications/WorldClock";
import Seconds from "./complications/Seconds";
import Temperature from "./complications/Temperature";
import SunDial from "./complications/SunDial";

export default function SubDial({ dialId, timezone, primaryMenu, clockColor, dial }) {
    return (
        <>
            {dial === "world-clock" && (
                <WorldClock dialId={dialId} timezone={timezone} primaryMenu={primaryMenu} clockColor={clockColor} />
            )}
            {dial === "temperature" && (
                <Temperature dialId={dialId} primaryMenu={primaryMenu} clockColor={clockColor} />
            )}
            {dial === "sun-dial" && <SunDial dialId={dialId} primaryMenu={primaryMenu} clockColor={clockColor} />}
            {dial === "seconds" && <Seconds dialId={dialId} primaryMenu={primaryMenu} clockColor={clockColor} />}
        </>
    );
}
