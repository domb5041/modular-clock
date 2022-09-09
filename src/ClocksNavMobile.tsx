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
    & > div {
        display: flex;
        & button {
            margin: 0 2px;
            background-color: transparent;
            border: none;
            color: white;
            border-radius: 5px;
            width: 40px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:disabled {
                color: grey;
            }
            &:first-of-type {
                margin-right: 5px;
            }
        }
    }
`;

const Icon = styled.svg`
    width: 22px;
    height: 22px;
    fill: white;
`;

function ClocksNavMobile() {
    const { clockStore } = useStores();
    return (
        <Container>
            <div>
                <button
                    disabled={clockStore.activeIndex < 1}
                    onClick={() => {
                        const newId = clockStore.clocks[clockStore.activeIndex - 1].id;
                        clockStore.setActiveClock(newId);
                    }}
                >
                    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"></path>
                    </Icon>
                </button>
                <button
                    disabled={clockStore.activeIndex >= clockStore.clocks.length - 1}
                    onClick={() => {
                        const newId = clockStore.clocks[clockStore.activeIndex + 1].id;
                        clockStore.setActiveClock(newId);
                    }}
                >
                    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
                    </Icon>
                </button>
            </div>
            <label>
                {clockStore.activeIndex + 1}/{clockStore.clocks.length}
            </label>
            <div>
                <button onClick={clockStore.addNewClock}>
                    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                    </Icon>
                </button>
                <button disabled={clockStore.activeIndex < 1} onClick={clockStore.deleteClock}>
                    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                    </Icon>
                </button>
            </div>
        </Container>
    );
}

export default observer(ClocksNavMobile);
