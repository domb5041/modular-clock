import { action, computed, makeObservable, observable } from "mobx";

class Store {
    clockColor = "nickel";
    primaryMenu = "colour";

    subDial = {
        topDial: { currentlyVisible: "none", timezone: "US/Hawaii" },
        leftDial: { currentlyVisible: "world-clock", timezone: "Europe/Paris" },
        rightDial: { currentlyVisible: "world-clock", timezone: "Asia/Tokyo" },
        bottomDial: { currentlyVisible: "sun-dial", timezone: "America/New_York" }
    };

    constructor() {
        makeObservable(this, {
            clockColor: observable,
            setClockColor: action,
            primaryMenu: observable,
            setPrimaryMenu: action,
            subDial: observable,
            setSubDial: action,
            mainTickData: computed
        });
    }

    setClockColor(c) {
        this.clockColor = c;
    }

    setPrimaryMenu(m) {
        this.primaryMenu = m;
    }

    setSubDial(dial, attr, value) {
        const newSubDial = { ...this.subDial };
        newSubDial[dial][attr] = value;
        this.subDial = newSubDial;
    }

    get mainTickData() {
        return [
            { deg: 0, type: "hrShort", number: this.subDial.topDial.currentlyVisible === "none" ? "12" : null },
            { deg: 6, type: "min" },
            { deg: 12, type: "min" },
            { deg: 18, type: "min" },
            { deg: 24, type: "min" },
            { deg: 30, type: "hrShort", number: "1" },
            { deg: 36, type: "min" },
            { deg: 42, type: "min" },
            { deg: 48, type: "min" },
            { deg: 54, type: "min" },
            { deg: 60, type: "hrShort", number: "2" },
            { deg: 66, type: "min" },
            { deg: 72, type: "min" },
            { deg: 78, type: "min" },
            { deg: 84, type: "min" },
            { deg: 90, type: "hrShort", number: this.subDial.topDial.currentlyVisible === "none" ? "3" : null },
            { deg: 96, type: "min" },
            { deg: 102, type: "min" },
            { deg: 108, type: "min" },
            { deg: 114, type: "min" },
            { deg: 120, type: "hrShort", number: "4" },
            { deg: 126, type: "min" },
            { deg: 132, type: "min" },
            { deg: 138, type: "min" },
            { deg: 144, type: "min" },
            { deg: 150, type: "hrShort", number: "5" },
            { deg: 156, type: "min" },
            { deg: 162, type: "min" },
            { deg: 168, type: "min" },
            { deg: 174, type: "min" },
            { deg: 180, type: "hrShort", number: this.subDial.topDial.currentlyVisible === "none" ? "6" : null },
            { deg: 186, type: "min" },
            { deg: 192, type: "min" },
            { deg: 198, type: "min" },
            { deg: 204, type: "min" },
            { deg: 210, type: "hrShort", number: "7" },
            { deg: 216, type: "min" },
            { deg: 222, type: "min" },
            { deg: 228, type: "min" },
            { deg: 234, type: "min" },
            { deg: 240, type: "hrShort", number: "8" },
            { deg: 246, type: "min" },
            { deg: 252, type: "min" },
            { deg: 258, type: "min" },
            { deg: 264, type: "min" },
            { deg: 270, type: "hrShort", number: this.subDial.topDial.currentlyVisible === "none" ? "9" : null },
            { deg: 276, type: "min" },
            { deg: 282, type: "min" },
            { deg: 288, type: "min" },
            { deg: 294, type: "min" },
            { deg: 300, type: "hrShort", number: "10" },
            { deg: 306, type: "min" },
            { deg: 312, type: "min" },
            { deg: 318, type: "min" },
            { deg: 324, type: "min" },
            { deg: 330, type: "hrShort", number: "11" },
            { deg: 336, type: "min" },
            { deg: 342, type: "min" },
            { deg: 348, type: "min" },
            { deg: 354, type: "min" }
        ];
    }
}

export default new Store();
