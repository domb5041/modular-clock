import styled from "styled-components";
import { observer } from "mobx-react";
import store from "./store/store";
import { transparentize } from "polished";

const Container = styled.div`
    justify-content: space-between;
    align-items: center;
    display: none;
    padding: 5px;
    @media (max-width: 1000px), (max-height: 800px) {
        display: flex;
    }
    & > label {
        font-size: 16px;
    }
    & > button {
        background-color: ${transparentize(0.8, "white")};
        border: none;
        color: white;
        border-radius: 5px;
        font-size: 25px;
        padding: 5px 12px;
        &:disabled {
            color: grey;
        }
    }
`;

function ClockNavMobile() {
    return (
        <Container>
            <button
                disabled={store.activeIndex < 1}
                onClick={() => {
                    const newId = store.clocks[store.activeIndex - 1].id;
                    store.setActiveClock(newId);
                }}
            >
                ◀︎
            </button>
            <label>
                {store.activeIndex + 1}/{store.clocks.length}
            </label>
            <button
                disabled={store.activeIndex >= store.clocks.length - 1}
                onClick={() => {
                    const newId = store.clocks[store.activeIndex + 1].id;
                    store.setActiveClock(newId);
                }}
            >
                ▶︎
            </button>
        </Container>
    );
}

export default observer(ClockNavMobile);
