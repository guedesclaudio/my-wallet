import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Boxes() {

    return (
        <Container>
            <Link to = {"/entry"}>
                <Box>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <BoxText>Nova entrada</BoxText>
                </Box>
            </Link>
            <Link to = {"/exit"}>
                <Box>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <BoxText>Nova saída</BoxText>
                </Box>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Box = styled.div`
    height: 114px;
    width: 156px;
    border-radius: 5px;
    background-color: #A328D6;

    && ion-icon {
        font-size: 26px;
        color: white;
        padding-left: 10px;
        padding-top: 10px;
    }
`
const BoxText = styled.p`
    font-family: "Raleway";
    font-size: 17px;
    width: 64px;
    height: 40px;
    font-weight: 700;
    line-height: 20px;
    color: #FFFFFF;
    padding-top: 30px;
    padding-left: 10px;
`