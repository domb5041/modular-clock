import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
html {
    background-color: black;
    color: white;
    font-size: 10px;
    user-select: none;
    @media ${theme.screen.clockSize}{
        font-size: 2vw;
    }
}

body {
    margin: 0;
    font-family: 'Abel', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

input, select {
    font-family: 'Abel', sans-serif;
}

.material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}

&::-webkit-scrollbar {
    width: 0;
    height: 0;
}
`;
