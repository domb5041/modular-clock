import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { IClock } from "../sharedTypes";

class tickStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    returnTickType(clock: IClock, pos?: keyof IClock["subDial"]) {
        const { clockStyle, subDial } = clock;
        const minimal = clockStyle === "minimal";
        if (pos) {
            const dialOff = subDial[pos].currentlyVisible === "none";
            const monogram = subDial[pos].currentlyVisible === "monogram";
            return (minimal && dialOff) || monogram ? "hrLong" : "hrShort";
        }
        return minimal ? "hr" : "hrShort";
    }

    returnNumberType(clock: IClock, n: string, dialPosition?: keyof IClock["subDial"]) {
        const { clockStyle, subDial } = clock;
        const minimal = clockStyle === "minimal";
        let showNumber = true;
        if (dialPosition) {
            showNumber = subDial[dialPosition].currentlyVisible === "none";
        }
        return minimal || !showNumber ? null : n;
    }

    mainTickData(clock: IClock) {
        return [
            {
                deg: 0,
                type: this.returnTickType(clock, "topDial"),
                number: this.returnNumberType(clock, "12", "topDial")
            },
            { deg: 6, type: "min" },
            { deg: 12, type: "min" },
            { deg: 18, type: "min" },
            { deg: 24, type: "min" },
            { deg: 30, type: this.returnTickType(clock), number: this.returnNumberType(clock, "1") },
            { deg: 36, type: "min" },
            { deg: 42, type: "min" },
            { deg: 48, type: "min" },
            { deg: 54, type: "min" },
            { deg: 60, type: this.returnTickType(clock), number: this.returnNumberType(clock, "2") },
            { deg: 66, type: "min" },
            { deg: 72, type: "min" },
            { deg: 78, type: "min" },
            { deg: 84, type: "min" },
            {
                deg: 90,
                type: this.returnTickType(clock, "rightDial"),
                number: this.returnNumberType(clock, "3", "rightDial")
            },
            { deg: 96, type: "min" },
            { deg: 102, type: "min" },
            { deg: 108, type: "min" },
            { deg: 114, type: "min" },
            { deg: 120, type: this.returnTickType(clock), number: this.returnNumberType(clock, "4") },
            { deg: 126, type: "min" },
            { deg: 132, type: "min" },
            { deg: 138, type: "min" },
            { deg: 144, type: "min" },
            { deg: 150, type: this.returnTickType(clock), number: this.returnNumberType(clock, "5") },
            { deg: 156, type: "min" },
            { deg: 162, type: "min" },
            { deg: 168, type: "min" },
            { deg: 174, type: "min" },
            {
                deg: 180,
                type: this.returnTickType(clock, "bottomDial"),
                number: this.returnNumberType(clock, "6", "bottomDial")
            },
            { deg: 186, type: "min" },
            { deg: 192, type: "min" },
            { deg: 198, type: "min" },
            { deg: 204, type: "min" },
            { deg: 210, type: this.returnTickType(clock), number: this.returnNumberType(clock, "7") },
            { deg: 216, type: "min" },
            { deg: 222, type: "min" },
            { deg: 228, type: "min" },
            { deg: 234, type: "min" },
            { deg: 240, type: this.returnTickType(clock), number: this.returnNumberType(clock, "8") },
            { deg: 246, type: "min" },
            { deg: 252, type: "min" },
            { deg: 258, type: "min" },
            { deg: 264, type: "min" },
            {
                deg: 270,
                type: this.returnTickType(clock, "leftDial"),
                number: this.returnNumberType(clock, "9", "leftDial")
            },
            { deg: 276, type: "min" },
            { deg: 282, type: "min" },
            { deg: 288, type: "min" },
            { deg: 294, type: "min" },
            { deg: 300, type: this.returnTickType(clock), number: this.returnNumberType(clock, "10") },
            { deg: 306, type: "min" },
            { deg: 312, type: "min" },
            { deg: 318, type: "min" },
            { deg: 324, type: "min" },
            { deg: 330, type: this.returnTickType(clock), number: this.returnNumberType(clock, "11") },
            { deg: 336, type: "min" },
            { deg: 342, type: "min" },
            { deg: 348, type: "min" },
            { deg: 354, type: "min" }
        ];
    }

    worldClockTickData(clock: IClock) {
        const { clockStyle } = clock;
        const major = clockStyle === "minimal" ? "subLong" : "subShort";
        const minor = clockStyle === "minimal" ? "sub" : "subShort";
        return [
            { deg: 0, type: major, number: this.returnNumberType(clock, "12") },
            { deg: 30, type: minor, number: this.returnNumberType(clock, "1") },
            { deg: 60, type: minor, number: this.returnNumberType(clock, "2") },
            { deg: 90, type: minor, number: this.returnNumberType(clock, "3") },
            { deg: 120, type: minor, number: this.returnNumberType(clock, "4") },
            { deg: 150, type: minor, number: this.returnNumberType(clock, "5") },
            { deg: 180, type: minor, number: this.returnNumberType(clock, "6") },
            { deg: 210, type: minor, number: this.returnNumberType(clock, "7") },
            { deg: 240, type: minor, number: this.returnNumberType(clock, "8") },
            { deg: 270, type: minor, number: this.returnNumberType(clock, "9") },
            { deg: 300, type: minor, number: this.returnNumberType(clock, "10") },
            { deg: 330, type: minor, number: this.returnNumberType(clock, "11") }
        ];
    }

    secondsTickData(clock: IClock) {
        const { clockStyle } = clock;
        const major = "subShort";
        const minor = clockStyle === "minimal" ? "sub" : "subShort";
        return [
            { deg: 0, type: major, number: "60" },
            { deg: 30, type: minor, number: this.returnNumberType(clock, "05") },
            { deg: 60, type: minor, number: this.returnNumberType(clock, "10") },
            { deg: 90, type: major, number: "15" },
            { deg: 120, type: minor, number: this.returnNumberType(clock, "20") },
            { deg: 150, type: minor, number: this.returnNumberType(clock, "25") },
            { deg: 180, type: major, number: "30" },
            { deg: 210, type: minor, number: this.returnNumberType(clock, "35") },
            { deg: 240, type: minor, number: this.returnNumberType(clock, "40") },
            { deg: 270, type: major, number: "45" },
            { deg: 300, type: minor, number: this.returnNumberType(clock, "50") },
            { deg: 330, type: minor, number: this.returnNumberType(clock, "55") }
        ];
    }

    sunDialTickData(clock: IClock) {
        const major = "subShort";
        const minor = "subShort";
        return [
            { deg: 0, type: major, number: "12" },
            { deg: 15, type: minor },
            { deg: 30, type: minor, number: this.returnNumberType(clock, "14") },
            { deg: 45, type: minor },
            { deg: 60, type: minor, number: this.returnNumberType(clock, "16") },
            { deg: 75, type: minor },
            { deg: 90, type: major, number: "18" },
            { deg: 105, type: minor },
            { deg: 120, type: minor, number: this.returnNumberType(clock, "20") },
            { deg: 135, type: minor },
            { deg: 150, type: minor, number: this.returnNumberType(clock, "22") },
            { deg: 165, type: minor },
            { deg: 180, type: major, number: "24" },
            { deg: 195, type: minor },
            { deg: 210, type: minor, number: this.returnNumberType(clock, "02") },
            { deg: 225, type: minor },
            { deg: 240, type: minor, number: this.returnNumberType(clock, "04") },
            { deg: 255, type: minor },
            { deg: 270, type: major, number: "06" },
            { deg: 285, type: minor },
            { deg: 300, type: minor, number: this.returnNumberType(clock, "08") },
            { deg: 315, type: minor },
            { deg: 330, type: minor, number: this.returnNumberType(clock, "10") },
            { deg: 345, type: minor }
        ];
    }

    temperatureDialTickData = (clock: IClock, tempMin: number, tempMax: number) => {
        const range = tempMax - tempMin;
        const steps = 9;
        const degIncrement = 220 / steps;
        const ticks = [];
        for (let i = 0; i <= steps; i++) {
            const number = Math.round(tempMin + i * (range / steps));
            const numberConditional = this.returnNumberType(clock, number.toString());
            const minMax = i === 0 || i === steps;
            ticks.push({
                deg: i * degIncrement - 110,
                type: clock.clockStyle === "minimal" && !minMax ? "sub" : "subShort",
                number: minMax ? number : numberConditional
            });
        }
        return ticks;
    };
}

export default tickStore;
