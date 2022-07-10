import styled from "styled-components";
import { transparentize } from "polished";

export const Container = styled.div`
    position: relative;
    height: 100%;
    width: 200px;
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

export const OptionsBlock = styled.div`
    border-bottom: 1px solid grey;
    overflow: hidden;
    height: ${(props) => (props.active ? 100 : 0)}px;
    opacity: ${(props) => (props.active ? 1 : 0)};
    transition: 0.7s cubic-bezier(0, 0, 0, 1.01);
`;

export const Dropdown = styled.div`
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
