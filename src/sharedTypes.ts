import { theme } from "./theme";

export interface ISubDial {
    currentlyVisible: string;
    timezone: string;
    monogram?: string;
}

export interface IClock {
    id: string;
    clockStyle: string;
    clockColor: keyof typeof theme.colors;
    subDial: {
        topDial: ISubDial;
        leftDial: ISubDial;
        rightDial: ISubDial;
        bottomDial: ISubDial;
    };
}
