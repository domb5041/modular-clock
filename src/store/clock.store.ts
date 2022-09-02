import { makeAutoObservable } from "mobx";
import { timeToDegrees } from "../utilityFunctions";
import { swatches } from "../theme";
import { IClock } from "../sharedTypes";
import { RootStore } from ".";

class clockStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    time = timeToDegrees();

    setTime = () => {
        this.time = timeToDegrees();
    };

    activeClock = "clock-0";

    clocks = [
        {
            id: "clock-0",
            clockStyle: "minimal",
            clockColor: "nickel",
            subDial: {
                topDial: { currentlyVisible: "temperature", timezone: "US/Hawaii", monogram: "react" },
                leftDial: { currentlyVisible: "world-clock", timezone: "Europe/Paris", monogram: "" },
                rightDial: { currentlyVisible: "world-clock", timezone: "Asia/Tokyo", monogram: "" },
                bottomDial: { currentlyVisible: "sun-dial", timezone: "America/New_York", monogram: "" }
            }
        },
        {
            id: "clock-01",
            clockStyle: "numbers",
            clockColor: "copper",
            subDial: {
                topDial: { currentlyVisible: "sun-dial", timezone: "US/Hawaii", monogram: "react" },
                leftDial: { currentlyVisible: "none", timezone: "Europe/Paris", monogram: "" },
                rightDial: { currentlyVisible: "none", timezone: "Asia/Tokyo", monogram: "" },
                bottomDial: { currentlyVisible: "seconds", timezone: "America/New_York", monogram: "" }
            }
        },
        {
            id: "clock-02",
            clockStyle: "minimal",
            clockColor: "forest",
            subDial: {
                topDial: { currentlyVisible: "sun-dial", timezone: "US/Hawaii", monogram: "react" },
                leftDial: { currentlyVisible: "none", timezone: "Europe/Paris", monogram: "" },
                rightDial: { currentlyVisible: "none", timezone: "Asia/Tokyo", monogram: "" },
                bottomDial: { currentlyVisible: "seconds", timezone: "America/New_York", monogram: "" }
            }
        },
        {
            id: "clock-03",
            clockStyle: "minimal",
            clockColor: "storm",
            subDial: {
                topDial: { currentlyVisible: "sun-dial", timezone: "US/Hawaii", monogram: "react" },
                leftDial: { currentlyVisible: "none", timezone: "Europe/Paris", monogram: "" },
                rightDial: { currentlyVisible: "none", timezone: "Asia/Tokyo", monogram: "" },
                bottomDial: { currentlyVisible: "seconds", timezone: "America/New_York", monogram: "" }
            }
        }
    ];

    setActiveClock(id: string) {
        this.previousActiveIndex = this.activeIndex;
        this.activeClock = id;
    }

    setClockStyle(style: "minimal" | "numbers") {
        const newClocks = [...this.clocks];
        newClocks[this.activeIndex].clockStyle = style;
        this.clocks = newClocks;
    }

    setClockColor(color: typeof swatches[number]["id"]) {
        const newClocks = [...this.clocks];
        newClocks[this.activeIndex].clockColor = color;
        this.clocks = newClocks;
    }

    setSubDial(dial: keyof IClock["subDial"], attr: keyof IClock["subDial"]["topDial"], value: string) {
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
