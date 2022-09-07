import styled from "styled-components";
import out from "../../img/out.png"
import UserContext from "../../contexts/UserContext.js"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react"

export default function Home() {

    const {userData, config} = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <Container>
            <BoxWelcome>
                <WelcomeText>Olá, {userData.name}</WelcomeText>
                <img src = {out} onClick = {() => navigate("/")}/>
            </BoxWelcome>
            <Screen>
                <Text>Não há registros de entrada ou saída</Text>
            </Screen>
            <Boxes>
                <Link to = {"/entry"}>
                    <Box>
                        <BoxIcon src = ""/>
                        <BoxText>Nova entrada</BoxText>
                    </Box>
                </Link>
                <Link to = {"/exit"}>
                    <Box>
                        <BoxIcon src = ""/>
                        <BoxText>Nova saída</BoxText>
                    </Box>
                </Link>
            </Boxes>
        </Container>
    )
}

const Container = styled.div`
    margin: 20px auto;
    width: 327px;
`
const BoxWelcome = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const WelcomeText = styled.h1`
    font-family: "Raleway";
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    text-align: left;
    color: #FFFFFF;
`
const Screen = styled.div`
    margin-top: 20px;
    height: 446px;
    width: 326px;
    border-radius: 5px;
    background-color: #FFFFFF;
`
const Text = styled.p`
    padding-top: 60%;
    text-align: center;
    font-family: "Raleway";
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #868686;
`
const Boxes = styled.div`
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
`
const BoxIcon = styled.img`

`
const BoxText = styled.p`
    font-family: "Raleway";
    font-size: 17px;
    width: 64px;
    height: 40px;
    font-weight: 700;
    line-height: 20px;
    color: #FFFFFF;
    padding-top: 50px;
    padding-left: 10px;
`
