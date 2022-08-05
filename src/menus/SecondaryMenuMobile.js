import React from "react";
import { observer } from "mobx-react";
import store from "../store/store";
import styled from "styled-components";
import { transparentize } from "polished";
import OptionsBlock from "./OptionsBlock";

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

const OptionsBlockMobile = styled(OptionsBlock)`
    padding: ${(props) => (props.active ? 10 : 0)}px;
    border-bottom: ${(props) => (props.active ? 1 : 0)}px solid ${transparentize(0.7, "white")};
`;

export default observer(() => {
    return (
        <Container>
            {store.secondaryMenus[store.primaryMenu].menu.map((menuItem, i) => (
                <>
                    <MenuItem
                        key={i}
                        active={store.secondaryMenus[store.primaryMenu].activeItem === menuItem.id}
                        onClick={() => store.secondaryMenus[store.primaryMenu].onClick(menuItem.id)}
                        disabled={menuItem.disabled}
                    >
                        {menuItem.name}
                    </MenuItem>
                    <OptionsBlockMobile
                        options={menuItem.options}
                        active={store.secondaryMenus[store.primaryMenu].activeItem === menuItem.id && menuItem.options}
                        disabled={menuItem.disabled}
                    />
                </>
            ))}
        </Container>
    );
});
