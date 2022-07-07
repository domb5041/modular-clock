import { action, makeObservable, observable } from "mobx";

class Store {
    clockColor = "nickel";
    primaryMenu = "colour";
    leftDial = "world-clock";
    rightDial = "world-clock";
    bottomDial = "world-clock";
    leftDialZone = { city: "paris", offset: 1 };
    rightDialZone = { city: "tokyo", offset: 9 };
    bottomDialZone = { city: "new delhi", offset: 5.5 };

    constructor() {
        makeObservable(this, {
            clockColor: observable,
            setClockColor: action,
            primaryMenu: observable,
            setPrimaryMenu: action,
            leftDial: observable,
            setLeftDial: action,
            rightDial: observable,
            setRightDial: action,
            bottomDial: observable,
            setBottomDial: action,
            leftDialZone: observable,
            setLeftDialZone: action,
            rightDialZone: observable,
            setRightDialZone: action,
            bottomDialZone: observable,
            setBottomDialZone: action
        });
    }

    setClockColor(c) {
        this.clockColor = c;
    }

    setPrimaryMenu(m) {
        this.primaryMenu = m;
    }

    setLeftDial(d) {
        this.leftDial = d;
    }

    setRightDial(d) {
        this.rightDial = d;
    }

    setBottomDial(d) {
        this.bottomDial = d;
    }

    setLeftDialZone(z) {
        this.leftDialZone = z;
    }

    setRightDialZone(z) {
        this.rightDialZone = z;
    }

    setBottomDialZone(z) {
        this.bottomDialZone = z;
    }
}

export default new Store();
