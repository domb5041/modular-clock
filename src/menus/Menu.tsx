import React, { useState, useEffect } from "react";
import { Container, ContainerInner, MenuItem } from "./Menu.styled";
import OptionsBlock from "./OptionsBlock";
import { useStores } from "../store";

export default function Menu({ secondaryMenu, onClick, activeItem, menuSelected, menu }) {
    const { clockStore } = useStores();
    const [menuOffset, setMenuOffset] = useState(0);

    useEffect(() => {
        const i = menu.findIndex((m) => {
            return activeItem === m.id;
        });

        setMenuOffset(i * -40);
    }, [menuSelected, clockStore.activeClock, activeItem, menu]);

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
}
