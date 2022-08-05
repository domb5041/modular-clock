import React from "react";
import { observer } from "mobx-react";
import store from "../store/store";
import Menu from "./Menu";
import { MenuConnector } from "./Menu.styled";

export default observer(() => {
    return (
        <>
            <MenuConnector />
            <Menu
                menu={store.secondaryMenus[store.primaryMenu].menu}
                onClick={store.secondaryMenus[store.primaryMenu].onClick}
                secondaryMenu
                activeItem={store.secondaryMenus[store.primaryMenu].activeItem}
                menuSelected={store.primaryMenu}
            />
        </>
    );
});
