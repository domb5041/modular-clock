import { makeAutoObservable } from "mobx";

class clockStore {
    constructor() {
        makeAutoObservable(this);
    }

    activeClock = "clock-0";

    clocks = [
        {
            id: "clock-0",
            clockStyle: "minimal",
            clockColor: "nickel",
            subDial: {
                topDial: { currentlyVisible: "monogram", timezone: "US/Hawaii", monogram: "react" },
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
                topDial: { currentlyVisible: "sun-dial", timezone: "US/Hawaii", monogram: "react" },
                leftDial: { currentlyVisible: "none", timezone: "Europe/Paris" },
                rightDial: { currentlyVisible: "none", timezone: "Asia/Tokyo" },
                bottomDial: { currentlyVisible: "seconds", timezone: "America/New_York" }
            }
        },
        {
            id: "clock-02",
            clockStyle: "minimal",
            clockColor: "forest",
            subDial: {
                topDial: { currentlyVisible: "sun-dial", timezone: "US/Hawaii", monogram: "react" },
                leftDial: { currentlyVisible: "none", timezone: "Europe/Paris" },
                rightDial: { currentlyVisible: "none", timezone: "Asia/Tokyo" },
                bottomDial: { currentlyVisible: "seconds", timezone: "America/New_York" }
            }
        },
        {
            id: "clock-03",
            clockStyle: "minimal",
            clockColor: "storm",
            subDial: {
                topDial: { currentlyVisible: "sun-dial", timezone: "US/Hawaii", monogram: "react" },
                leftDial: { currentlyVisible: "none", timezone: "Europe/Paris" },
                rightDial: { currentlyVisible: "none", timezone: "Asia/Tokyo" },
                bottomDial: { currentlyVisible: "seconds", timezone: "America/New_York" }
            }
        }
    ];

    setActiveClock(id) {
        this.previousActiveIndex = this.activeIndex;
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

    setSubDial(dial, attr, value) {
        const newClocks = [...this.clocks];
        newClocks[this.activeIndex].subDial[dial][attr] = value;
        this.clocks = newClocks;
    }

    previousActiveIndex = -1;

    get activeIndex() {
        return this.clocks.findIndex((clock) => clock.id === this.activeClock);
    }
}

export default clockStore;
