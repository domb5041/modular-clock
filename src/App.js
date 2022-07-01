import MainDial from "./MainDial";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

export default function App() {
    return (
        <Container>
            <MainDial />
        </Container>
    );
}
