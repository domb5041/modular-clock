import React, { FC } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { IMenuOption } from "./Menu";

const Container = styled.div<{ mobileVersion: boolean }>`
    border-bottom: 1px solid grey;
    overflow: hidden;
    height: 100px;
    opacity: 1;
    padding: ${(props) => (props.mobileVersion ? "10px" : 0)};
    box-sizing: border-box;
    &.block-enter {
        opacity: 0;
        height: 0;
        padding: ${(props) => (props.mobileVersion ? "0 10px" : 0)};
    }
    &.block-enter-active {
        opacity: 1;
        height: 100px;
        padding: ${(props) => (props.mobileVersion ? "10px" : 0)};
        transition: ${(props) => (props.mobileVersion ? "0.2s" : "0.7s cubic-bezier(0, 0, 0, 1.01)")};
    }
    &.block-exit {
        opacity: 1;
        height: 100px;
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
    & label {
        text-transform: uppercase;
        font-size: 13px;
        padding-right: 5px;
    }
    & select,
    & input {
        background-color: transparent;
        border: 1px solid white;
        color: white;
        outline: none;
        border-radius: 4px;
    }
`;

interface IOptionsBlockProps {
    options: IMenuOption[];
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
