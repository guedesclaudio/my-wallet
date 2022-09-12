import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import out from "../../img/out.png"

export default function BoxWelcome () {

    const navigate = useNavigate()
    const {userData} = useContext(UserContext)

    return (
        <Container>
            <WelcomeText>Olá, {userData.name}</WelcomeText>
            <img src = {out} alt = "icone" onClick = {() => navigate("/")}/>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    && img:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`
const WelcomeText = styled.h1`
    font-family: "Raleway";
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    text-align: left;
    color: #FFFFFF;
`