import React from "react";
import { observer } from "mobx-react";
import store from "../store/store";
import Menu from "./Menu";

export default observer(() => {
    const primaryMenuOptions = [
        { id: "colour", name: "colour" },
        { id: "topDial", name: "top dial" },
        { id: "leftDial", name: "left dial" },
        { id: "rightDial", name: "right dial" },
        { id: "bottomDial", name: "bottom dial" }
    ];

    return <Menu activeItem={store.primaryMenu} menu={primaryMenuOptions} onClick={(c) => store.setPrimaryMenu(c)} />;
});
