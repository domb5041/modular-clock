import styled from "styled-components";
import { observer } from "mobx-react";
import Symbol from "./Symbol";
import { useStores } from "./store";
import { transparentize } from "polished";

const Container = styled.div`
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    display: flex;
    margin: 0 auto;
    & > label {
        font-size: 16px;
        letter-spacing: 3px;
        width: 100px;
        text-align: center;
    }
`;

const Button = styled.button`
    background-color: ${transparentize(0.83, "white")};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    padding: 0;
    width: 35px;
    height: 35px;
    border: none;
    cursor: pointer;
    margin: 0 10px;
`;

function ClocksNavMobile() {
    const { clockStore } = useStores();
    return (
        <Container>
            <Button
                disabled={clockStore.activeIndex < 1}
                onClick={() => {
                    const newId = clockStore.clocks[clockStore.activeIndex - 1].id;
                    clockStore.setActiveClock(newId);
                }}
            >
                <Symbol name="navigate_before" size="30px" />
            </Button>
            <Button
                disabled={clockStore.activeIndex >= clockStore.clocks.length - 1}
                onClick={() => {
                    const newId = clockStore.clocks[clockStore.activeIndex + 1].id;
                    clockStore.setActiveClock(newId);
                }}
            >
                <Symbol name="navigate_next" size="30px" />
            </Button>
            <label>
                {clockStore.activeIndex + 1}/{clockStore.clocks.length}
            </label>
            <Button onClick={clockStore.addNewClock}>
                <Symbol name="add" />
            </Button>
            <Button disabled={clockStore.activeIndex < 1} onClick={clockStore.deleteClock}>
                <Symbol name="close" size="22px" />
            </Button>
        </Container>
    );
}

export default observer(ClocksNavMobile);
