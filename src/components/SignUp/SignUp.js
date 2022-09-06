import { Link, useNavigate } from "react-router-dom"
import { Logo, Input, Button, Text} from "../CommomStyles/Sign.js"
import { postSignUp } from "../../services/mywallet.js"
import { useState } from "react"
import styled from "styled-components"

export default function SignUp() {

    const [form, setForm] = useState({})
    const navigate = useNavigate()

    function handleForm ({name, value}) {
        setForm({
            ...form,
            [name] : value
        })
    }

    function userRegistration (event) {
        event.preventDefault()
        const {password, confirmPassword} = form
        console.log(form)
        if (password !== confirmPassword) {
            alert("Confirme sua senha corretamente")
            return
        }
        navigate("/")
    }

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <form onSubmit = {userRegistration}>
                <Input placeholder = "Nome" type = "text" name = "name" 
                onChange = {event => handleForm({name: event.target.name, value: event.target.value})}/>
                <Input placeholder = "Email" type = "email" name = "email"
                onChange = {event => handleForm({name: event.target.name, value: event.target.value})}/>
                <Input placeholder = "Senha" type = "password" name = "password"
                onChange = {event => handleForm({name: event.target.name, value: event.target.value})}/>
                <Input placeholder = "Confirme a senha" type = "password" name = "confirmPassword"
                onChange = {event => handleForm({name: event.target.name, value: event.target.value})}/>
                <Button type = "submit">Cadastrar</Button>
            </form>
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