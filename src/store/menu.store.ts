import { makeAutoObservable } from "mobx";
import { swatches } from "../theme";
import { timezones } from "../complications/WorldClock";

class menuStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    primaryMenu = "colour";

    setPrimaryMenu(m) {
        this.primaryMenu = m;
    }

    subDialMenu(pos) {
        const { subDial } = this.rootStore.clockStore.clocks[this.rootStore.clockStore.activeIndex];
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
                        onChange: (city) => this.rootStore.clockStore.setSubDial(pos, "timezone", city)
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
                        onChange: (text) => this.rootStore.clockStore.setSubDial(pos, "monogram", text)
                    }
                ]
            },
            { id: "none", name: "off" }
        ];
    }

    get secondaryMenus() {
        const { clockStyle, clockColor, subDial } =
            this.rootStore.clockStore.clocks[this.rootStore.clockStore.activeIndex];
        const styleMenu = [
            { id: "minimal", name: "minimal" },
            { id: "numbers", name: "detailed" }
        ];
        return {
            style: {
                menu: styleMenu,
                onClick: (c) => this.rootStore.clockStore.setClockStyle(c),
                activeItem: clockStyle
            },
            colour: {
                menu: swatches,
                onClick: (c) => this.rootStore.clockStore.setClockColor(c),
                activeItem: clockColor
            },
            topDial: {
                menu: this.subDialMenu("topDial"),
                onClick: (dialId) => this.rootStore.clockStore.setSubDial("topDial", "currentlyVisible", dialId),
                activeItem: subDial.topDial.currentlyVisible
            },
            leftDial: {
                menu: this.subDialMenu("leftDial"),
                onClick: (dialId) => this.rootStore.clockStore.setSubDial("leftDial", "currentlyVisible", dialId),
                activeItem: subDial.leftDial.currentlyVisible
            },
            rightDial: {
                menu: this.subDialMenu("rightDial"),
                onClick: (dialId) => this.rootStore.clockStore.setSubDial("rightDial", "currentlyVisible", dialId),
                activeItem: subDial.rightDial.currentlyVisible
            },
            bottomDial: {
                menu: this.subDialMenu("bottomDial"),
                onClick: (dialId) => this.rootStore.clockStore.setSubDial("bottomDial", "currentlyVisible", dialId),
                activeItem: subDial.bottomDial.currentlyVisible
            }
        };
    }
}

export default menuStore;
