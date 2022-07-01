import { darken, transparentize, lighten } from "polished";

export const theme = (color) => ({ ...colorsDef[color] });

export const swatches = ["silver", "red", "green", "blue"];

export const colorsDef = {
    silver: {
        base: "silver",
        subDial: darken(0.55, "silver"),
        dialInner: transparentize(0.75, "silver"),
        dialOuter: transparentize(0.7, "silver"),
        text: lighten(0.2, "silver")
    },
    red: {
        base: "#FF4949",
        subDial: darken(0.55, "#FF4949"),
        dialInner: transparentize(0.75, "#FF4949"),
        dialOuter: transparentize(0.7, "#FF4949"),
        text: lighten(0.2, "#FF4949")
    },
    green: {
        base: "#4EF076",
        subDial: darken(0.52, "#4EF076"),
        dialInner: transparentize(0.75, "#4EF076"),
        dialOuter: transparentize(0.7, "#4EF076"),
        text: "#4EF076"
    },
    blue: {
        base: "#4EC4F0",
        subDial: darken(0.5, "#4EC4F0"),
        dialInner: transparentize(0.75, "#4EC4F0"),
        dialOuter: transparentize(0.7, "#4EC4F0"),
        text: "#4EC4F0"
    }
};
