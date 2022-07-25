import React, { useState, useEffect } from "react";
import { Container, ContainerInner, MenuItem, OptionsBlock, TextInput } from "./Menu.styled";

export default function Menu({ secondaryMenu, onClick, activeItem, menuSelected, menu }) {
    const [menuOffset, setMenuOffset] = useState(0);

    useEffect(() => {
        const i = menu.findIndex((m) => {
            return activeItem === m.id;
        });

        setMenuOffset(i * -40);
    }, [menuSelected]);

    return (
        <Container>
            <ContainerInner menuOffset={menuOffset}>
                {menu.map((m, i) => (
                    <>
                        <MenuItem
                            key={`menu-item-${i}`}
                            onClick={() => {
                                onClick(m.id);
                                setMenuOffset(i * -40);
                            }}
                            active={activeItem === m.id}
                            secondaryMenu={secondaryMenu}
                            disabled={m.disabled}
                        >
                            <div className="inner-text">{m.name}</div>
                        </MenuItem>
                        {secondaryMenu && (
                            <OptionsBlock active={activeItem === m.id && m.options} key={`option-block-${i}`}>
                                {m.options &&
                                    m.options.map((option, i) => (
                                        <>
                                            {option.type === "dropdown" && (
                                                <TextInput id={option.id} key={i}>
                                                    <label id={`${option.id}-label`} htmlFor={`${option.id}-input`}>
                                                        city
                                                    </label>
                                                    <select
                                                        name=""
                                                        id={`${option.id}-input`}
                                                        onChange={(e) => option.onChange(e.target.value)}
                                                        value={option.value}
                                                    >
                                                        {option.list.map((l) => (
                                                            <option value={l.id}>{l.name}</option>
                                                        ))}
                                                    </select>
                                                </TextInput>
                                            )}
                                            {option.type === "text" && (
                                                <TextInput>
                                                    <label id={`${option.id}-label`} htmlFor={`${option.id}-input`}>
                                                        text
                                                    </label>
                                                    <input
                                                        value={option.value}
                                                        onChange={(e) => option.onChange(e.target.value)}
                                                        id={`${option.id}-input`}
                                                        maxLength="20"
                                                    />
                                                </TextInput>
                                            )}
                                        </>
                                    ))}
                            </OptionsBlock>
                        )}
                    </>
                ))}
            </ContainerInner>
        </Container>
    );
}
