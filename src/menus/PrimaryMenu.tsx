import React from "react";
import { observer } from "mobx-react";
import Menu from "./Menu";
import { MenuConnector } from "./Menu.styled";
import { useStores } from "../store";

export const primaryMenuOptions = [
    { id: "style", name: "style" },
    { id: "colour", name: "colour" },
    { id: "topDial", name: "top dial" },
    { id: "leftDial", name: "left dial" },
    { id: "rightDial", name: "right dial" },
    { id: "bottomDial", name: "bottom dial" }
] as const;

export default observer(() => {
    const { menuStore } = useStores();
    return (
        <>
            <Menu
                activeItem={menuStore.primaryMenu}
                menu={primaryMenuOptions}
                onClick={(c) => menuStore.setPrimaryMenu(c)}
            />
            <MenuConnector />
        </>
    );
});
