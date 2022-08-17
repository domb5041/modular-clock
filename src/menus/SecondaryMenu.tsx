import React from "react";
import { observer } from "mobx-react";
import Menu from "./Menu";
import { MenuConnector } from "./Menu.styled";
import { useStores } from "../store";
import { primaryMenuOptions } from "./PrimaryMenu";

export default observer(() => {
    const { primaryMenu, secondaryMenus } = useStores().menuStore;
    const menu = secondaryMenus[primaryMenu];
    return (
        <>
            <MenuConnector />
            <Menu
                menu={menu.menu}
                onClick={menu.onClick}
                secondaryMenu
                activeItem={menu.activeItem}
                primaryMenuSelection={primaryMenu as typeof primaryMenuOptions[number]["id"]}
            />
        </>
    );
});
