import { Logo, Input, Button, Text } from "../CommomStyles/Sign.js"
import { Link } from "react-router-dom"
import { postSignIn } from "../../services/mywallet.js"
import { useContext, useState } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext.js"

export default function SignIn() {

    const {userData, setUserData, config, setConfig} = useContext(UserContext)
    const [form, setForm] = useState({})

    function handleForm ({name, value}) {
        setForm({
            ...form,
            [name] : value
        })
    }

    function userLogin (event) {
        event.preventDefault()
        console.log(form)
    }

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <form onSubmit = {userLogin}>
                <Input placeholder = "Email" type = "email" name = "email" 
                onChange = {event => handleForm({name: event.target.name, value: event.target.value})}/>
                <Input placeholder = "Senha" type = "password" name = "password"
                onChange = {event => handleForm({name: event.target.name, value: event.target.value})}/>
                <Button type = "submit">Entrar</Button>
            </form>
            <Link to = {"/signup"}>
                <Text>Primeira vez? Cadastre-se!</Text>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    margin: 140px auto;
    width: 327px;
`