import { darken, transparentize } from "polished";

export const theme = (color) => ({ ...colorsDef[color], text: transparentize(0.1, "silver") });

export const swatches = ["nickel", "copper", "forest", "storm"];

export const colorsDef = {
    nickel: {
        base: "#ACA496",
        subDial: darken(0.45, "#ACA496"),
        dialInner: transparentize(0.62, "#ACA496"),
        dialOuter: transparentize(0.7, "#ACA496"),
        secondHand: "#e13939",
        ticks: transparentize(0.3, "#ACA496")
    },
    copper: {
        base: "#A67D43",
        subDial: darken(0.3, "#A67D43"),
        dialInner: transparentize(0.62, "#A67D43"),
        dialOuter: transparentize(0.7, "#A67D43"),
        secondHand: "#a32a0c",
        ticks: transparentize(0.3, "#A67D43")
    },
    forest: {
        base: "#59834D",
        subDial: darken(0.27, "#59834D"),
        dialInner: transparentize(0.6, "#59834D"),
        dialOuter: transparentize(0.7, "#59834D"),
        secondHand: "#eb562e",
        ticks: transparentize(0.3, "#59834D")
    },
    storm: {
        base: "#425495",
        subDial: darken(0.27, "#425495"),
        dialInner: transparentize(0.6, "#425495"),
        dialOuter: transparentize(0.7, "#425495"),
        secondHand: "#bdc064",
        ticks: transparentize(0.3, "#425495")
    }
};
