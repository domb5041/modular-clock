import { darken, transparentize } from "polished";

export const theme = {
    colors: {
        nickel: {
            base: "#ACA496",
            subDial: darken(0.45, "#ACA496"),
            dialInner: transparentize(0.62, "#ACA496"),
            secondHand: "#e13939",
            ticks: transparentize(0.3, "#ACA496"),
            hands: "white",
            text: "white"
        },
        copper: {
            base: "#A67D43",
            subDial: darken(0.3, "#A67D43"),
            dialInner: transparentize(0.62, "#A67D43"),
            secondHand: "#a32a0c",
            ticks: transparentize(0.3, "#A67D43"),
            hands: "white",
            text: "white"
        },
        forest: {
            base: "#59834D",
            subDial: darken(0.27, "#59834D"),
            dialInner: transparentize(0.6, "#59834D"),
            secondHand: "#eb562e",
            ticks: transparentize(0.3, "#59834D"),
            hands: "white",
            text: "white"
        },
        storm: {
            base: "#425495",
            subDial: darken(0.27, "#425495"),
            dialInner: transparentize(0.6, "#425495"),
            secondHand: "#bdc064",
            ticks: transparentize(0.3, "#425495"),
            hands: "white",
            text: "white"
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
    { id: "forest", name: "forest" },
    { id: "storm", name: "storm" }
] as const;

export const colorTransition = "0.7s";
