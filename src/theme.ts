import { darken, transparentize } from "polished";

export const theme = {
    colors: {
        nickel: {
            base: "#ACA496",
            subDial: darken(0.45, "#ACA496"),
            dialInner: transparentize(0.62, "#ACA496"),
            secondHand: "#e13939",
            ticks: transparentize(0.3, "#ACA496"),
            hands: "#E0DBD9",
            text: "#E0DBD9"
        },
        copper: {
            base: "#A67D43",
            subDial: darken(0.3, "#A67D43"),
            dialInner: transparentize(0.62, "#A67D43"),
            secondHand: "#FF3427",
            ticks: transparentize(0.3, "#A67D43"),
            hands: "#B9925A",
            text: "#FDD9A5"
        },
        alpine: {
            base: "#59834D",
            subDial: darken(0.27, "#59834D"),
            dialInner: transparentize(0.6, "#59834D"),
            secondHand: "#eb562e",
            ticks: transparentize(0.3, "#59834D"),
            hands: "#B5C5B2",
            text: "#B5C5B2"
        },
        storm: {
            base: "#425495",
            subDial: darken(0.27, "#425495"),
            dialInner: transparentize(0.6, "#425495"),
            secondHand: "#bdc064",
            ticks: transparentize(0.3, "#425495"),
            hands: "#C0C0B4",
            text: "#BFC1C9"
        },
        redLight: {
            base: "#FF3535",
            subDial: darken(0.47, "#FF3535"),
            dialInner: transparentize(0.75, "#FF3535"),
            secondHand: "#FF3535",
            ticks: transparentize(0.3, "#FF3535"),
            hands: "#FF3535",
            text: "#FF3535"
        },
        stealth: {
            base: "#454545",
            subDial: "#151515",
            dialInner: "#151515",
            secondHand: "#801A00",
            ticks: "#3B3B3B",
            hands: "#515151",
            text: "#878787"
        },
        ultraViolet: {
            base: "#BB58D6",
            subDial: "#192847",
            dialInner: "#261E49",
            secondHand: "#B747A1",
            ticks: transparentize(0.3, "#BB58D6"),
            hands: "#CCAFC6",
            text: "#C68BD6"
        },
        polar: {
            base: "#7EB0C8",
            subDial: "#25343B",
            dialInner: "#25343B",
            secondHand: "#DD6524",
            ticks: transparentize(0.3, "#7EB0C8"),
            hands: "#D5D5D5",
            text: "#ACBFC8"
        }
    },
    screen: {
        mobile: "(max-width: 1000px), (max-height: 700px)",
        clockSize: "(max-width: 500px)"
    }
};

export const swatches = [
    { id: "nickel", name: "nickel" },
    { id: "copper", name: "copper" },
    { id: "alpine", name: "alpine" },
    { id: "storm", name: "storm" },
    { id: "redLight", name: "red light" },
    { id: "stealth", name: "stealth" },
    { id: "ultraViolet", name: "ultraViolet" },
    { id: "polar", name: "polar" }
] as const;

export const colorTransition = "0.7s";
