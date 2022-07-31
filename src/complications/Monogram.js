import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import store from "../store/store";

const Text = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    color: ${(props) => props.theme.text};
    letter-spacing: 4px;
    width: 180px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
`;

function Monogram({ position }) {
    const { monogram } = store.clocks[store.activeIndex].subDial[position];
    const getFontSize = () => {
        const length = monogram.length || 1;
        const size = 30 / length;
        return size + 18;
    };
    return <Text style={{ fontSize: getFontSize() }}>{monogram}</Text>;
}

export default observer(Monogram);
