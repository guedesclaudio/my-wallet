import styled from "styled-components"
import {Logo,Input,Button,Text} from "../CommomStyles/Sign.js"
import { Link } from "react-router-dom"


export default function SignIn() {

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <Input placeholder = "Email"/>
            <Input placeholder = "Senha"/>
            <Button>Entrar</Button>
            <Link to = {"/SignUp"}>
                <Text>Primeira vez? Cadastre-se!</Text>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    margin: 140px auto;
    width: 327px;
`