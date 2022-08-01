import styled from "styled-components";
import { transparentize } from "polished";

export const Container = styled.div`
    position: relative;
    height: 100%;
    width: 200px;
    flex-shrink: 0;
`;

export const ContainerInner = styled.div`
    width: 100%;
    position: absolute;
    top: calc(50% - 20px);
    transform: translateY(${(props) => props.menuOffset}px);
    transition: 0.7s cubic-bezier(0, 0, 0, 1.01);
`;

export const MenuItem = styled.div`
    height: 40px;
    display: flex;
    justify-content: ${(props) => (props.secondaryMenu ? "flex-start" : "flex-end")};
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? "none" : "all")};
    & .inner-text {
        transition: 0.2s;
        padding: 0 4px;
        background-color: ${(props) => (props.active ? "white" : "transparent")};
        color: ${(props) => (props.disabled ? "silver" : props.active ? "black" : "white")};
        border-radius: 4px;
        display: inline-block;
    }
    &:hover .inner-text {
        background-color: ${(props) => (props.active ? "white" : transparentize(0.7, "white"))};
    }
`;
