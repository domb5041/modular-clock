import React, { FC } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { IMenuOption } from "./Menu";
import { transparentize } from "polished";
import Symbol from "../Symbol";

const Container = styled.div<{ mobileVersion: boolean }>`
    overflow: hidden;
    height: 50px;
    opacity: 1;
    padding: ${(props) => (props.mobileVersion ? "10px" : 0)};
    &.block-enter {
        opacity: 0;
        height: 0;
        padding: ${(props) => (props.mobileVersion ? "0 10px" : 0)};
    }
    &.block-enter-active {
        opacity: 1;
        height: 50px;
        padding: ${(props) => (props.mobileVersion ? "10px" : 0)};
        transition: ${(props) => (props.mobileVersion ? "0.2s" : "0.7s cubic-bezier(0, 0, 0, 1.01)")};
    }
    &.block-exit {
        opacity: 1;
        height: 50px;
        padding: ${(props) => (props.mobileVersion ? "10px" : 0)};
    }
    &.block-exit-active {
        opacity: 0;
        height: 0;
        padding: ${(props) => (props.mobileVersion ? "0 10px" : 0)};
        transition: ${(props) => (props.mobileVersion ? "0.2s" : "0.7s cubic-bezier(0, 0, 0, 1.01)")};
    }
`;

const TextInput = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
    position: relative;
    & label {
        text-transform: uppercase;
        padding-right: 5px;
    }
    & select,
    & input {
        text-transform: uppercase;
        flex: 1;
        font-size: 16px;
        background-color: transparent;
        -webkit-appearance: none;
        border: 1px solid ${transparentize(0.7, "white")};
        color: white;
        outline: none;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 5px;
        min-width: 0;
    }
`;

const DropArrow = styled(Symbol)`
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
`;

interface IOptionsBlockProps {
    options: readonly IMenuOption[];
    active: boolean;
    mobileVersion?: boolean;
}

const OptionsBlock: FC<IOptionsBlockProps> = ({ options, active, mobileVersion }) => {
    return (
        <CSSTransition in={active} unmountOnExit timeout={700} classNames="block">
            <Container className="block" mobileVersion={mobileVersion}>
                {options &&
                    options.map((option, i) => (
                        <div key={i}>
                            {option.type === "dropdown" && (
                                <TextInput id={option.id}>
                                    <label id={`${option.id}-label`} htmlFor={`${option.id}-input`}>
                                        city
                                    </label>
                                    <select
                                        name=""
                                        id={`${option.id}-input`}
                                        onChange={(e) => option.onChange(e.target.value)}
                                        value={option.value}
                                    >
                                        {option.list.map((l, i) => (
                                            <option key={i} value={l.id}>
                                                {l.name}
                                            </option>
                                        ))}
                                    </select>
                                    <DropArrow name="expand_more" />
                                </TextInput>
                            )}
                            {option.type === "text" && (
                                <TextInput id={option.id}>
                                    <label id={`${option.id}-label`} htmlFor={`${option.id}-input`}>
                                        text
                                    </label>
                                    <input
                                        value={option.value}
                                        onChange={(e) => option.onChange(e.target.value)}
                                        id={`${option.id}-input`}
                                        maxLength={20}
                                    />
                                </TextInput>
                            )}
                        </div>
                    ))}
            </Container>
        </CSSTransition>
    );
};

export default OptionsBlock;
