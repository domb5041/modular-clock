import React from "react";
import { observer } from "mobx-react";
import Menu from "./Menu";
import { MenuConnector } from "./Menu.styled";
import { useStores } from "../store";

export default observer(() => {
    const { primaryMenu, secondaryMenus } = useStores().menuStore;
    return (
        <>
            <MenuConnector />
            <Menu
                menu={secondaryMenus[primaryMenu].menu}
                onClick={secondaryMenus[primaryMenu].onClick}
                secondaryMenu
                activeItem={secondaryMenus[primaryMenu].activeItem}
                menuSelected={primaryMenu}
            />
        </>
    );
});
