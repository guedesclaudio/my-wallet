import styled from "styled-components"
import { Link } from "react-router-dom"
import {Logo,Input,Button,Text} from "../CommomStyles/Sign.js"


export default function SignUp() {

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <Input placeholder = "Nome"/>
            <Input placeholder = "Email"/>
            <Input placeholder = "Senha"/>
            <Input placeholder = "Confirme a senha"/>
            <Button>Cadastrar</Button>
            <Link to = {"/"}>
                <Text>Já tem uma conta? Entre agora!</Text>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    margin: 80px auto;
    width: 327px;
`