import React, { useState, useEffect, FC } from "react";
import { Container, ContainerInner, MenuItem } from "./Menu.styled";
import OptionsBlock from "./OptionsBlock";
import { useStores } from "../store";
import { primaryMenuOptions } from "./PrimaryMenu";

export interface IMenuProps {
    secondaryMenu?: boolean;
    onClick: (id: string) => void;
    activeItem: string;
    primaryMenuSelection?: typeof primaryMenuOptions[number]["id"];
    menu: readonly IMenu[];
}

export interface IMenu {
    id: string;
    name: string;
    disabled?: boolean;
    options?: readonly IMenuOption[];
}

export interface IMenuOption {
    id: string;
    type: "text" | "dropdown";
    value: string;
    label: string;
    onChange: (text: string) => void;
    list?: readonly any[];
}

const Menu: FC<IMenuProps> = ({ secondaryMenu, onClick, activeItem, primaryMenuSelection, menu }) => {
    const { clockStore } = useStores();
    const [menuOffset, setMenuOffset] = useState(0);

    useEffect(() => {
        const i = menu.findIndex((m) => {
            return activeItem === m.id;
        });

        setMenuOffset(i * -40);
    }, [primaryMenuSelection, clockStore.activeClock, activeItem, menu]);

    return (
        <Container>
            <ContainerInner menuOffset={menuOffset}>
                {menu.map((menuItem, i) => (
                    <div id={`menu-item-${i}`} key={`menu-item-${i}`}>
                        <MenuItem
                            onClick={() => {
                                onClick(menuItem.id);
                                setMenuOffset(i * -40);
                            }}
                            active={activeItem === menuItem.id}
                            secondaryMenu={secondaryMenu}
                            disabled={menuItem.disabled}
                        >
                            <div className="inner-text">{menuItem.name}</div>
                        </MenuItem>
                        {secondaryMenu && (
                            <OptionsBlock
                                options={menuItem.options}
                                active={activeItem === menuItem.id && "options" in menuItem && !menuItem.disabled}
                            />
                        )}
                    </div>
                ))}
            </ContainerInner>
        </Container>
    );
};

export default Menu;
