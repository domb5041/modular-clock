import React from "react";
import * as styled from "../Dials.styled";
import { observer } from "mobx-react";
import store from "../store/store";

function Temperature({ dialId }) {
    return (
        <styled.SubDial dialId={dialId} primaryMenu={store.primaryMenu}>
            temperature
        </styled.SubDial>
    );
}

export default observer(Temperature);
