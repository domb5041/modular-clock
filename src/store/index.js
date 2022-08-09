import React from "react";
import ClockStore from "./clock.store";
import MenuStore from "./menu.store";
import TickStore from "./tick.store";

class RootStore {
    constructor() {
        this.clockStore = new ClockStore(this);
        this.menuStore = new MenuStore(this);
        this.tickStore = new TickStore(this);
    }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
