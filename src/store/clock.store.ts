import { makeAutoObservable } from "mobx";
import { timeToDegrees } from "../utilityFunctions";
import { swatches } from "../theme";
import { IClock } from "../sharedTypes";
import { RootStore } from ".";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";

class clockStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
        makePersistable(this, {
            name: "clockStore",
            properties: ["clocks", "activeClock"],
            storage: window.localStorage,
            debugMode: false
        });
    }

    async clearStored() {
        await clearPersistedStore(this);
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
            id: "clock-1",
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
            id: "clock-2",
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
            id: "clock-3",
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

    addNewClock = () => {
        const id = `clock-${Math.random()}`;
        const payload = {
            id: id,
            clockStyle: "minimal",
            clockColor: "nickel",
            subDial: {
                topDial: { currentlyVisible: "monogram", timezone: "US/Hawaii", monogram: "new clock" },
                leftDial: { currentlyVisible: "none", timezone: "Europe/Paris", monogram: "" },
                rightDial: { currentlyVisible: "none", timezone: "Asia/Tokyo", monogram: "" },
                bottomDial: { currentlyVisible: "none", timezone: "America/New_York", monogram: "" }
            }
        };
        this.clocks.push(payload);
        this.setActiveClock(id);
    };

    deleteClock = () => {
        const index = this.activeIndex;
        this.setActiveClock(index === 0 ? this.clocks[1].id : this.clocks[index - 1].id);
        this.clocks.splice(index, 1);
    };
}

export default clockStore;
