import React from "react";
import { swatches } from "../theme";
import { observer } from "mobx-react";
import store from "../store/store";
import { timezones } from "../complications/WorldClock";
import Menu from "./Menu";

export default observer(() => {
    const subDialMenu = (pos) => [
        {
            id: "world-clock",
            name: "world clock",
            options: [
                {
                    id: "timezone-selector",
                    type: "dropdown",
                    value: store.subDial[pos].timezone,
                    list: timezones,
                    label: "city",
                    onChange: (city) => store.setSubDial(pos, "timezone", city)
                }
            ]
        },
        { id: "temperature", name: "temperature" },
        { id: "sun-dial", name: "sunrise sunset" },
        { id: "seconds", name: "seconds" },
        { id: "none", name: "off" }
    ];

    const secondaryMenus = {
        colour: { menu: swatches, onClick: (c) => store.setClockColor(c), activeItem: store.clockColor },
        topDial: {
            menu: subDialMenu("topDial"),
            onClick: (dialId) => store.setSubDial("topDial", "currentlyVisible", dialId),
            activeItem: store.subDial.topDial.currentlyVisible
        },
        leftDial: {
            menu: subDialMenu("leftDial"),
            onClick: (dialId) => store.setSubDial("leftDial", "currentlyVisible", dialId),
            activeItem: store.subDial.leftDial.currentlyVisible
        },
        rightDial: {
            menu: subDialMenu("rightDial"),
            onClick: (dialId) => store.setSubDial("rightDial", "currentlyVisible", dialId),
            activeItem: store.subDial.rightDial.currentlyVisible
        },
        bottomDial: {
            menu: subDialMenu("bottomDial"),
            onClick: (dialId) => store.setSubDial("bottomDial", "currentlyVisible", dialId),
            activeItem: store.subDial.bottomDial.currentlyVisible
        }
    };

    return (
        <Menu
            menu={secondaryMenus[store.primaryMenu].menu}
            onClick={secondaryMenus[store.primaryMenu].onClick}
            secondaryMenu
            activeItem={secondaryMenus[store.primaryMenu].activeItem}
            menuSelected={store.primaryMenu}
        />
    );
});
