import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { transparentize } from "polished";
import OptionsBlock from "./OptionsBlock";
import { useStores } from "../store";
import { primaryMenuOptions } from "./PrimaryMenu";
import { IMenuProps } from "./Menu";

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;
`;

const MenuItem = styled.div<{ active: boolean; disabled: boolean }>`
    margin: 0 5px;
    padding: 7px 10px;
    font-size: 16px;
    text-transform: uppercase;
    background-color: ${(props) => (props.active ? transparentize(0.8, "white") : "transparent")};
    border-radius: 5px;
    pointer-events: ${(props) => (props.disabled ? "none" : "all")};
    color: ${(props) => (props.disabled ? "silver" : "white")};
    text-decoration: ${(props) => (props.disabled ? "line-through" : "none")};
`;

export default observer(() => {
    const { primaryMenu, secondaryMenus } = useStores().menuStore;
    const menu = secondaryMenus[primaryMenu as typeof primaryMenuOptions[number]["id"]] as IMenuProps;
    return (
        <Container>
            {menu.menu.map((menuItem, i) => (
                <>
                    <MenuItem
                        key={i}
                        active={menu.activeItem === menuItem.id}
                        onClick={() => menu.onClick(menuItem.id)}
                        disabled={menuItem.disabled}
                    >
                        {menuItem.name}
                    </MenuItem>
                    <OptionsBlock
                        mobileVersion
                        options={menuItem.options}
                        active={menu.activeItem === menuItem.id && "options" in menuItem && !menuItem.disabled}
                    />
                </>
            ))}
        </Container>
    );
});
