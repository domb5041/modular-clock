import styled from "styled-components";
import { observer } from "mobx-react";
import { transparentize } from "polished";
import { useStores } from "./store";

const Container = styled.div`
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    display: flex;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    & > label {
        font-size: 16px;
        letter-spacing: 3px;
    }
    & > button {
        margin: 0 5px;
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

function ClocksNavMobile() {
    const { clockStore } = useStores();
    return (
        <Container>
            <button
                disabled={clockStore.activeIndex < 1}
                onClick={() => {
                    const newId = clockStore.clocks[clockStore.activeIndex - 1].id;
                    clockStore.setActiveClock(newId);
                }}
            >
                ◀︎
            </button>
            <label>
                {clockStore.activeIndex + 1}/{clockStore.clocks.length}
            </label>
            <button
                disabled={clockStore.activeIndex >= clockStore.clocks.length - 1}
                onClick={() => {
                    const newId = clockStore.clocks[clockStore.activeIndex + 1].id;
                    clockStore.setActiveClock(newId);
                }}
            >
                ▶︎
            </button>
        </Container>
    );
}

export default observer(ClocksNavMobile);
