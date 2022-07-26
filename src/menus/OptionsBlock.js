import React from "react";
import styled from "styled-components";

const Container = styled.div`
    border-bottom: ${(props) => (props.active ? 1 : 0)}px solid grey;
    overflow: hidden;
    height: ${(props) => (props.active ? 100 : 0)}px;
    opacity: ${(props) => (props.active ? 1 : 0)};
    transition: 0.7s cubic-bezier(0, 0, 0, 1.01);
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

export default function OptionsBlock({ options, active }) {
    return (
        <Container active={active}>
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
                                    maxLength="20"
                                />
                            </TextInput>
                        )}
                    </div>
                ))}
        </Container>
    );
}
