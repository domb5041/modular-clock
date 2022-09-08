import React from "react";
import ClockStore from "./clock.store";
import MenuStore from "./menu.store";
import TickStore from "./tick.store";
import WeatherStore from "./weather.store";

export class RootStore {
    clockStore: ClockStore;
    menuStore: MenuStore;
    tickStore: TickStore;
    weatherStore: WeatherStore;
    constructor() {
        this.clockStore = new ClockStore(this);
        this.menuStore = new MenuStore(this);
        this.tickStore = new TickStore(this);
        this.weatherStore = new WeatherStore();
    }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
