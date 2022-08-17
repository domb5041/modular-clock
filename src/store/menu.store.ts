import { makeAutoObservable } from "mobx";
import { swatches } from "../theme";
import { timezones } from "../complications/WorldClock";
import { IClock } from "../sharedTypes";
import { primaryMenuOptions } from "../menus/PrimaryMenu";
import { RootStore } from ".";

class menuStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    primaryMenu = "colour";

    setPrimaryMenu(id: typeof primaryMenuOptions[number]["id"]) {
        this.primaryMenu = id;
    }

    subDialMenu(pos: keyof IClock["subDial"]) {
        const { clockStore } = this.rootStore;
        const { subDial } = clockStore.clocks[clockStore.activeIndex];
        return [
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
                        onChange: (city: typeof timezones[number]["id"]) => clockStore.setSubDial(pos, "timezone", city)
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
                        onChange: (text: string) => clockStore.setSubDial(pos, "monogram", text)
                    }
                ]
            },
            { id: "none", name: "off" }
        ];
    }

    get secondaryMenus() {
        const { clockStore } = this.rootStore;
        const { clockStyle, clockColor, subDial } = clockStore.clocks[clockStore.activeIndex];
        const styleMenu = [
            { id: "minimal", name: "minimal" },
            { id: "numbers", name: "detailed" }
        ] as const;
        return {
            style: {
                menu: styleMenu,
                onClick: (style: typeof styleMenu[number]["id"]) => clockStore.setClockStyle(style),
                activeItem: clockStyle
            },
            colour: {
                menu: swatches,
                onClick: (color: typeof swatches[number]["id"]) => clockStore.setClockColor(color),
                activeItem: clockColor
            },
            topDial: {
                menu: this.subDialMenu("topDial"),
                onClick: (dialId: string) => clockStore.setSubDial("topDial", "currentlyVisible", dialId),
                activeItem: subDial.topDial.currentlyVisible
            },
            leftDial: {
                menu: this.subDialMenu("leftDial"),
                onClick: (dialId: string) => clockStore.setSubDial("leftDial", "currentlyVisible", dialId),
                activeItem: subDial.leftDial.currentlyVisible
            },
            rightDial: {
                menu: this.subDialMenu("rightDial"),
                onClick: (dialId: string) => clockStore.setSubDial("rightDial", "currentlyVisible", dialId),
                activeItem: subDial.rightDial.currentlyVisible
            },
            bottomDial: {
                menu: this.subDialMenu("bottomDial"),
                onClick: (dialId: string) => clockStore.setSubDial("bottomDial", "currentlyVisible", dialId),
                activeItem: subDial.bottomDial.currentlyVisible
            }
        };
    }
}

export default menuStore;
