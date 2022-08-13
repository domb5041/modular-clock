import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { transparentize } from "polished";
import OptionsBlock from "./OptionsBlock";
import { useStores } from "../store";

const Container = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;
`;

const MenuItem = styled.div`
    margin: 0 5px;
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
    const { primaryMenu, secondaryMenus } = useStores().menuStore;
    return (
        <Container>
            {secondaryMenus[primaryMenu].menu.map((menuItem, i) => (
                <>
                    <MenuItem
                        key={i}
                        active={secondaryMenus[primaryMenu].activeItem === menuItem.id}
                        onClick={() => secondaryMenus[primaryMenu].onClick(menuItem.id)}
                        disabled={menuItem.disabled}
                    >
                        {menuItem.name}
                    </MenuItem>
                    <OptionsBlock
                        mobileVersion
                        options={menuItem.options}
                        active={
                            secondaryMenus[primaryMenu].activeItem === menuItem.id &&
                            "options" in menuItem &&
                            !menuItem.disabled
                        }
                    />
                </>
            ))}
        </Container>
    );
});
