import { transparentize } from "polished";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    height: 100%;
    width: 200px;
`;

const ContainerInner = styled.div`
    width: 100%;
    position: absolute;
    top: calc(50% - 20px);
    transform: translateY(${(props) => props.menuOffset}px);
    transition: 0.7s cubic-bezier(0, 0, 0, 1.01);
`;

const MenuItem = styled.div`
    height: 40px;
    display: flex;
    justify-content: ${(props) => (props.secondaryMenu ? "flex-start" : "flex-end")};
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    & .inner-text {
        transition: 0.2s;
        padding: 0 4px;
        background-color: ${(props) => (props.active ? "white" : "transparent")};
        color: ${(props) => (props.active ? "black" : "white")};
        border-radius: 4px;
        display: inline-block;
    }
    &:hover .inner-text {
        background-color: ${(props) => (props.active ? "white" : transparentize(0.7, "white"))};
    }
`;

const OptionsBlock = styled.div`
    border-bottom: 1px solid grey;
    overflow: hidden;
    height: ${(props) => (props.active ? 100 : 0)}px;
    opacity: ${(props) => (props.active ? 1 : 0)};
    transition: 0.7s cubic-bezier(0, 0, 0, 1.01);
`;

const Dropdown = styled.div`
    & label {
        text-transform: uppercase;
        font-size: 13px;
        padding-right: 5px;
    }
    & select {
        background-color: transparent;
        border: 1px solid white;
        color: white;
        text-transform: uppercase;
        outline: none;
        border-radius: 4px;
    }
`;

export default function Menu({ menu, secondaryMenu, onClick, activeItem, menuSelected }) {
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
                        >
                            <div className="inner-text">{m.name}</div>
                        </MenuItem>
                        {secondaryMenu && (
                            <OptionsBlock active={activeItem === m.id && m.options} key={`option-block-${i}`}>
                                {m.options &&
                                    m.options.map((option) => (
                                        <Dropdown id={option.id}>
                                            <label id={`${option.id}-label`} htmlFor={`${option.id}-input`}>
                                                city
                                            </label>
                                            <select name="" id={`${option.id}-input`}>
                                                {option.list.map((l) => (
                                                    <option value={l.value}>{l.name}</option>
                                                ))}
                                            </select>
                                        </Dropdown>
                                    ))}
                            </OptionsBlock>
                        )}
                    </>
                ))}
            </ContainerInner>
        </Container>
    );
}
