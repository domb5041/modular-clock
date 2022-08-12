import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { transparentize } from "polished";
import OptionsBlock from "./OptionsBlock";
import { useStores } from "../store";

const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 0 5px;
`;

const MenuItem = styled.div`
    padding: 10px;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    background-color: ${(props) => (props.active ? transparentize(0.8, "white") : "transparent")};
    border-radius: 5px;
    pointer-events: ${(props) => (props.disabled ? "none" : "all")};
    color: ${(props) => (props.disabled ? "silver" : "white")};
`;

export default observer(() => {
    const { menuStore } = useStores();
    return (
        <Container>
            {menuStore.secondaryMenus[menuStore.primaryMenu].menu.map((menuItem, i) => (
                <>
                    <MenuItem
                        key={i}
                        active={menuStore.secondaryMenus[menuStore.primaryMenu].activeItem === menuItem.id}
                        onClick={() => menuStore.secondaryMenus[menuStore.primaryMenu].onClick(menuItem.id)}
                        disabled={menuItem.disabled}
                    >
                        {menuItem.name}
                    </MenuItem>
                    <OptionsBlock
                        mobileVersion
                        options={menuItem.options}
                        active={
                            menuStore.secondaryMenus[menuStore.primaryMenu].activeItem === menuItem.id &&
                            "options" in menuItem &&
                            !menuItem.disabled
                        }
                    />
                </>
            ))}
        </Container>
    );
});