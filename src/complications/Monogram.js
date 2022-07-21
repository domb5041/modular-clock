import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

const Text = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    color: ${(props) => props.theme.text};
    letter-spacing: 4px;
    font-size: 18px;
`;

function Monogram() {
    return <Text>Reactclock</Text>;
}

export default observer(Monogram);
