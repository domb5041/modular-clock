import React from "react";
import { swatches } from "../theme";
import { observer } from "mobx-react";
import store from "../store/store";
import { timezones } from "../complications/WorldClock";
import Menu from "./Menu";
import { MenuConnector } from "./Menu.styled";

export default observer(() => {
    const { clockStyle, clockColor, subDial } = store.clocks[store.activeIndex];

    const subDialMenu = (pos) => [
        {
            id: "world-clock",
            name: "world clock",
            options: [
                {
                    id: "timezone-selector",
                    type: "dropdown",
                    value: subDial[pos].timezone,
                    list: timezones,
                    label: "city",
                    onChange: (city) => store.setSubDial(pos, "timezone", city)
                }
            ]
        },
        { id: "temperature", name: "temperature" },
        { id: "sun-dial", name: "sunrise sunset" },
        { id: "seconds", name: "seconds" },
        {
            id: "monogram",
            name: "monogram",
            disabled: pos !== "topDial",
            options: [
                {
                    id: "monogram-text",
                    type: "text",
                    value: subDial[pos].monogram,
                    label: "text",
                    onChange: (text) => store.setSubDial(pos, "monogram", text)
                }
            ]
        },
        { id: "none", name: "off" }
    ];

    const styleMenu = [
        { id: "minimal", name: "minimal" },
        { id: "numbers", name: "detailed" }
    ];

    const secondaryMenus = {
        style: {
            menu: styleMenu,
            onClick: (c) => store.setClockStyle(c),
            activeItem: clockStyle
        },
        colour: {
            menu: swatches,
            onClick: (c) => store.setClockColor(c),
            activeItem: clockColor
        },
        topDial: {
            menu: subDialMenu("topDial"),
            onClick: (dialId) => store.setSubDial("topDial", "currentlyVisible", dialId),
            activeItem: subDial.topDial.currentlyVisible
        },
        leftDial: {
            menu: subDialMenu("leftDial"),
            onClick: (dialId) => store.setSubDial("leftDial", "currentlyVisible", dialId),
            activeItem: subDial.leftDial.currentlyVisible
        },
        rightDial: {
            menu: subDialMenu("rightDial"),
            onClick: (dialId) => store.setSubDial("rightDial", "currentlyVisible", dialId),
            activeItem: subDial.rightDial.currentlyVisible
        },
        bottomDial: {
            menu: subDialMenu("bottomDial"),
            onClick: (dialId) => store.setSubDial("bottomDial", "currentlyVisible", dialId),
            activeItem: subDial.bottomDial.currentlyVisible
        }
    };

    return (
        <>
            <MenuConnector />
            <Menu
                menu={secondaryMenus[store.primaryMenu].menu}
                onClick={secondaryMenus[store.primaryMenu].onClick}
                secondaryMenu
                activeItem={secondaryMenus[store.primaryMenu].activeItem}
                menuSelected={store.primaryMenu}
            />
        </>
    );
});
