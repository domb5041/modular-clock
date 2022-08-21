import { swatches } from "./theme";

export interface ISubDial {
    currentlyVisible: string;
    timezone: string;
    monogram?: string;
}

export interface IClock {
    id: string;
    clockStyle: string;
    clockColor: typeof swatches[number]["id"];
    subDial: {
        topDial: ISubDial;
        leftDial: ISubDial;
        rightDial: ISubDial;
        bottomDial: ISubDial;
    };
}
