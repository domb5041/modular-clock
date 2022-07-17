import { darken, transparentize } from "polished";

export const theme = (color) => ({ ...colorsDef[color], text: transparentize(0.1, "silver") });

export const swatches = [
    { id: "nickel", name: "nickel" },
    { id: "copper", name: "copper" },
    { id: "forest", name: "forest" },
    { id: "storm", name: "storm" }
];

export const colorTransition = "0.7s";

export const colorsDef = {
    nickel: {
        base: "#ACA496",
        subDial: darken(0.45, "#ACA496"),
        dialInner: transparentize(0.62, "#ACA496"),
        secondHand: "#e13939",
        ticks: transparentize(0.3, "#ACA496")
    },
    copper: {
        base: "#A67D43",
        subDial: darken(0.3, "#A67D43"),
        dialInner: transparentize(0.62, "#A67D43"),
        secondHand: "#a32a0c",
        ticks: transparentize(0.3, "#A67D43")
    },
    forest: {
        base: "#59834D",
        subDial: darken(0.27, "#59834D"),
        dialInner: transparentize(0.6, "#59834D"),
        secondHand: "#eb562e",
        ticks: transparentize(0.3, "#59834D")
    },
    storm: {
        base: "#425495",
        subDial: darken(0.27, "#425495"),
        dialInner: transparentize(0.6, "#425495"),
        secondHand: "#bdc064",
        ticks: transparentize(0.3, "#425495")
    }
};
