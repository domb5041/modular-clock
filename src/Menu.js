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
    transition: all 0.7s cubic-bezier(0, 0, 0, 1.01);
`;

const MenuItem = styled.div`
    height: 40px;
    display: flex;
    justify-content: ${(props) => (props.reverse ? "flex-start" : "flex-end")};
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

export default function Menu({ menu, noMenuKeys, reverse, onClick, activeItem, menuSelected }) {
    const [menuOffset, setMenuOffset] = useState(0);

    useEffect(() => {
        const i = menu.findIndex((m) => {
            return activeItem === (noMenuKeys ? m : m.id);
        });

        setMenuOffset(i * -40);
    }, [menuSelected]);

    return (
        <Container>
            <ContainerInner menuOffset={menuOffset}>
                {menu.map((m, i) => (
                    <MenuItem
                        key={i}
                        onClick={() => {
                            onClick(noMenuKeys ? m : m.id);
                            setMenuOffset(i * -40);
                        }}
                        active={activeItem === (noMenuKeys ? m : m.id)}
                        reverse={reverse}
                    >
                        <div className="inner-text">{noMenuKeys ? m : m.name}</div>
                    </MenuItem>
                ))}
            </ContainerInner>
        </Container>
    );
}
