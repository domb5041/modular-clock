import { action, computed, makeObservable, observable } from "mobx";

class Store {
    activeClock = "clock-0";
    primaryMenu = "colour";

    clocks = [
        {
            id: "clock-0",
            clockStyle: "minimal",
            clockColor: "nickel",
            subDial: {
                topDial: { currentlyVisible: "monogram", timezone: "US/Hawaii", monogram: "DB" },
                leftDial: { currentlyVisible: "world-clock", timezone: "Europe/Paris" },
                rightDial: { currentlyVisible: "world-clock", timezone: "Asia/Tokyo" },
                bottomDial: { currentlyVisible: "sun-dial", timezone: "America/New_York" }
            }
        },
        {
            id: "clock-01",
            clockStyle: "numbers",
            clockColor: "copper",
            subDial: {
                topDial: { currentlyVisible: "sun-dial", timezone: "US/Hawaii", monogram: "DB" },
                leftDial: { currentlyVisible: "none", timezone: "Europe/Paris" },
                rightDial: { currentlyVisible: "none", timezone: "Asia/Tokyo" },
                bottomDial: { currentlyVisible: "seconds", timezone: "America/New_York" }
            }
        }
    ];

    constructor() {
        makeObservable(this, {
            clocks: observable,
            activeClock: observable,
            setActiveClock: action,
            setClockStyle: action,
            setClockColor: action,
            primaryMenu: observable,
            setPrimaryMenu: action,
            setSubDial: action,
            mainTickData: computed,
            worldClockTickData: computed,
            secondsTickData: computed,
            sunDialTickData: computed,
            activeIndex: computed
        });
    }

    setActiveClock(id) {
        this.activeClock = id;
    }

    setClockStyle(style) {
        const newClocks = [...this.clocks];
        newClocks[this.activeIndex].clockStyle = style;
        this.clocks = newClocks;
    }

    setClockColor(color) {
        const newClocks = [...this.clocks];
        newClocks[this.activeIndex].clockColor = color;
        this.clocks = newClocks;
    }

    setPrimaryMenu(m) {
        this.primaryMenu = m;
    }

    setSubDial(dial, attr, value) {
        const newClocks = [...this.clocks];
        newClocks[this.activeIndex].subDial[dial][attr] = value;
        this.clocks = newClocks;
    }

    returnTickType(pos) {
        const { clockStyle, subDial } = this.clocks[this.activeIndex];
        const minimal = clockStyle === "minimal";
        if (pos) {
            const dialOff = subDial[pos].currentlyVisible === "none";
            const monogram = subDial[pos].currentlyVisible === "monogram";
            return (minimal && dialOff) || monogram ? "hrLong" : "hrShort";
        }
        return minimal ? "hr" : "hrShort";
    }

    returnNumberType(n, dialPosition) {
        const { clockStyle, subDial } = this.clocks[this.activeIndex];
        const minimal = clockStyle === "minimal";
        let showNumber = true;
        if (dialPosition) {
            showNumber = subDial[dialPosition].currentlyVisible === "none";
        }
        return minimal || !showNumber ? null : n;
    }

    get activeIndex() {
        return this.clocks.findIndex((clock) => clock.id === this.activeClock);
    }

    get mainTickData() {
        return [
            { deg: 0, type: this.returnTickType("topDial"), number: this.returnNumberType("12", "topDial") },
            { deg: 6, type: "min" },
            { deg: 12, type: "min" },
            { deg: 18, type: "min" },
            { deg: 24, type: "min" },
            { deg: 30, type: this.returnTickType(), number: this.returnNumberType("1") },
            { deg: 36, type: "min" },
            { deg: 42, type: "min" },
            { deg: 48, type: "min" },
            { deg: 54, type: "min" },
            { deg: 60, type: this.returnTickType(), number: this.returnNumberType("2") },
            { deg: 66, type: "min" },
            { deg: 72, type: "min" },
            { deg: 78, type: "min" },
            { deg: 84, type: "min" },
            { deg: 90, type: this.returnTickType("rightDial"), number: this.returnNumberType("3", "rightDial") },
            { deg: 96, type: "min" },
            { deg: 102, type: "min" },
            { deg: 108, type: "min" },
            { deg: 114, type: "min" },
            { deg: 120, type: this.returnTickType(), number: this.returnNumberType("4") },
            { deg: 126, type: "min" },
            { deg: 132, type: "min" },
            { deg: 138, type: "min" },
            { deg: 144, type: "min" },
            { deg: 150, type: this.returnTickType(), number: this.returnNumberType("5") },
            { deg: 156, type: "min" },
            { deg: 162, type: "min" },
            { deg: 168, type: "min" },
            { deg: 174, type: "min" },
            { deg: 180, type: this.returnTickType("bottomDial"), number: this.returnNumberType("6", "bottomDial") },
            { deg: 186, type: "min" },
            { deg: 192, type: "min" },
            { deg: 198, type: "min" },
            { deg: 204, type: "min" },
            { deg: 210, type: this.returnTickType(), number: this.returnNumberType("7") },
            { deg: 216, type: "min" },
            { deg: 222, type: "min" },
            { deg: 228, type: "min" },
            { deg: 234, type: "min" },
            { deg: 240, type: this.returnTickType(), number: this.returnNumberType("8") },
            { deg: 246, type: "min" },
            { deg: 252, type: "min" },
            { deg: 258, type: "min" },
            { deg: 264, type: "min" },
            { deg: 270, type: this.returnTickType("leftDial"), number: this.returnNumberType("9", "leftDial") },
            { deg: 276, type: "min" },
            { deg: 282, type: "min" },
            { deg: 288, type: "min" },
            { deg: 294, type: "min" },
            { deg: 300, type: this.returnTickType(), number: this.returnNumberType("10") },
            { deg: 306, type: "min" },
            { deg: 312, type: "min" },
            { deg: 318, type: "min" },
            { deg: 324, type: "min" },
            { deg: 330, type: this.returnTickType(), number: this.returnNumberType("11") },
            { deg: 336, type: "min" },
            { deg: 342, type: "min" },
            { deg: 348, type: "min" },
            { deg: 354, type: "min" }
        ];
    }

    get worldClockTickData() {
        const { clockStyle } = this.clocks[this.activeIndex];
        const major = clockStyle === "minimal" ? "subLong" : "subShort";
        const minor = clockStyle === "minimal" ? "sub" : "subShort";
        return [
            { deg: 0, type: major, number: this.returnNumberType("12") },
            { deg: 30, type: minor, number: this.returnNumberType("1") },
            { deg: 60, type: minor, number: this.returnNumberType("2") },
            { deg: 90, type: minor, number: this.returnNumberType("3") },
            { deg: 120, type: minor, number: this.returnNumberType("4") },
            { deg: 150, type: minor, number: this.returnNumberType("5") },
            { deg: 180, type: minor, number: this.returnNumberType("6") },
            { deg: 210, type: minor, number: this.returnNumberType("7") },
            { deg: 240, type: minor, number: this.returnNumberType("8") },
            { deg: 270, type: minor, number: this.returnNumberType("9") },
            { deg: 300, type: minor, number: this.returnNumberType("10") },
            { deg: 330, type: minor, number: this.returnNumberType("11") }
        ];
    }

    get secondsTickData() {
        const { clockStyle } = this.clocks[this.activeIndex];
        const major = "subShort";
        const minor = clockStyle === "minimal" ? "sub" : "subShort";
        return [
            { deg: 0, type: major, number: "60" },
            { deg: 30, type: minor, number: this.returnNumberType("05") },
            { deg: 60, type: minor, number: this.returnNumberType("10") },
            { deg: 90, type: major, number: "15" },
            { deg: 120, type: minor, number: this.returnNumberType("20") },
            { deg: 150, type: minor, number: this.returnNumberType("25") },
            { deg: 180, type: major, number: "30" },
            { deg: 210, type: minor, number: this.returnNumberType("35") },
            { deg: 240, type: minor, number: this.returnNumberType("40") },
            { deg: 270, type: major, number: "45" },
            { deg: 300, type: minor, number: this.returnNumberType("50") },
            { deg: 330, type: minor, number: this.returnNumberType("55") }
        ];
    }

    get sunDialTickData() {
        const major = "subShort";
        const minor = "subShort";
        return [
            { deg: 0, type: major, number: "12" },
            { deg: 15, type: minor },
            { deg: 30, type: minor, number: this.returnNumberType("14") },
            { deg: 45, type: minor },
            { deg: 60, type: minor, number: this.returnNumberType("16") },
            { deg: 75, type: minor },
            { deg: 90, type: major, number: "18" },
            { deg: 105, type: minor },
            { deg: 120, type: minor, number: this.returnNumberType("20") },
            { deg: 135, type: minor },
            { deg: 150, type: minor, number: this.returnNumberType("22") },
            { deg: 165, type: minor },
            { deg: 180, type: major, number: "24" },
            { deg: 195, type: minor },
            { deg: 210, type: minor, number: this.returnNumberType("02") },
            { deg: 225, type: minor },
            { deg: 240, type: minor, number: this.returnNumberType("04") },
            { deg: 255, type: minor },
            { deg: 270, type: major, number: "06" },
            { deg: 285, type: minor },
            { deg: 300, type: minor, number: this.returnNumberType("08") },
            { deg: 315, type: minor },
            { deg: 330, type: minor, number: this.returnNumberType("10") },
            { deg: 345, type: minor }
        ];
    }
}

export default new Store();
