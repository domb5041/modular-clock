import styled from "styled-components";
import { observer } from "mobx-react";
import store from "./store/store";
import { transparentize } from "polished";

const Container = styled.div`
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    display: flex;
    max-width: 500px;
    margin: 0 auto;
    & > label {
        font-size: 16px;
        letter-spacing: 3px;
    }
    & > button {
        background-color: ${transparentize(0.8, "white")};
        border: none;
        color: white;
        border-radius: 5px;
        font-size: 22px;
        width: 40px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
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
