import React from "react";
import { observer } from "mobx-react";
import { primaryMenuOptions } from "./PrimaryMenu";
import styled from "styled-components";
import { transparentize } from "polished";
import { useStores } from "../store";

const Container = styled.div`
    display: flex;
    padding: 15px 10px 10px 10px;
    overflow-x: auto;
    border-bottom: 1px solid ${transparentize(0.8, "white")};
`;

const MenuItem = styled.div<{ active: boolean }>`
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
    const { menuStore } = useStores();
    return (
        <Container>
            {primaryMenuOptions.map((menuItem, i) => (
                <MenuItem
                    key={i}
                    onClick={() => menuStore.setPrimaryMenu(menuItem.id)}
                    active={menuStore.primaryMenu === menuItem.id}
                >
                    {menuItem.name}
                </MenuItem>
            ))}
        </Container>
    );
});
