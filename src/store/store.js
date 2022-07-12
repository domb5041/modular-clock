import { action, makeObservable, observable } from "mobx";

class Store {
    clockColor = "nickel";
    primaryMenu = "colour";

    subDial = {
        leftDial: { currentlyVisible: "world-clock", timezone: "Europe/Paris" },
        rightDial: { currentlyVisible: "world-clock", timezone: "Asia/Tokyo" },
        bottomDial: { currentlyVisible: "temperature", timezone: "America/New_York" }
    };

    constructor() {
        makeObservable(this, {
            clockColor: observable,
            setClockColor: action,
            primaryMenu: observable,
            setPrimaryMenu: action,
            subDial: observable,
            setSubDial: action
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
}

export default new Store();
