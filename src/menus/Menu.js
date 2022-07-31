import React, { useState, useEffect } from "react";
import { Container, ContainerInner, MenuItem } from "./Menu.styled";
import OptionsBlock from "./OptionsBlock";
import store from "../store/store";

export default function Menu({ secondaryMenu, onClick, activeItem, menuSelected, menu }) {
    const [menuOffset, setMenuOffset] = useState(0);

    useEffect(() => {
        const i = menu.findIndex((m) => {
            return activeItem === m.id;
        });

        setMenuOffset(i * -40);
    }, [menuSelected, store.activeClock]);

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
                                active={activeItem === menuItem.id && menuItem.options}
                                disabled={menuItem.disabled}
                            />
                        )}
                    </div>
                ))}
            </ContainerInner>
        </Container>
    );
}
