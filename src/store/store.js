import { action, makeObservable, observable } from "mobx";

class Store {
    clockColor = "nickel";
    primaryMenu = "colour";

    subDial = {
        leftDial: { currentlyVisible: "world-clock", timezone: "paris" },
        rightDial: { currentlyVisible: "world-clock", timezone: "tokyo" },
        bottomDial: { currentlyVisible: "world-clock", timezone: "new delhi" }
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
