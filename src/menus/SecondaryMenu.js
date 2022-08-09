import React from "react";
import { observer } from "mobx-react";
import Menu from "./Menu";
import { MenuConnector } from "./Menu.styled";
import { useStores } from "../store";

export default observer(() => {
    const { menuStore } = useStores();
    return (
        <>
            <MenuConnector />
            <Menu
                menu={menuStore.secondaryMenus[menuStore.primaryMenu].menu}
                onClick={menuStore.secondaryMenus[menuStore.primaryMenu].onClick}
                secondaryMenu
                activeItem={menuStore.secondaryMenus[menuStore.primaryMenu].activeItem}
                menuSelected={menuStore.primaryMenu}
            />
        </>
    );
});
