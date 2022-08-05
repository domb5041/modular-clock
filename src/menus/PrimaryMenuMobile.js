import React from "react";
import { observer } from "mobx-react";
import store from "../store/store";
import { primaryMenuOptions } from "./PrimaryMenu";
import styled from "styled-components";
import { transparentize } from "polished";

const Container = styled.div`
    display: flex;
    padding: 15px 10px 10px 10px;
    overflow-x: auto;
    border-bottom: 1px solid ${transparentize(0.8, "white")};
    margin-bottom: 10px;
`;

const MenuItem = styled.div`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    color: ${(props) => (props.active ? "black" : "white")};
    background-color: ${(props) => (props.active ? "white" : "transparent")};
    flex-shrink: 0;
    border-radius: 4px;
    padding: 5px 7px;
    margin: 0 2px;
    &:first-of-type {
        margin-left: auto;
    }
    &:last-of-type {
        margin-right: auto;
    }
`;

export default observer(() => {
    return (
        <Container>
            {primaryMenuOptions.map((menuItem, i) => (
                <MenuItem
                    key={i}
                    onClick={() => store.setPrimaryMenu(menuItem.id)}
                    active={store.primaryMenu === menuItem.id}
                >
                    {menuItem.name}
                </MenuItem>
            ))}
        </Container>
    );
});
