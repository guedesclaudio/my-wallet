import { Link, useNavigate } from "react-router-dom"
import { Logo, Input, Button, Text} from "../CommomStyles/Sign.js"
import { postSignUp, handleForm } from "../../services/mywallet.js"
import { useState } from "react"
import styled from "styled-components"

export default function SignUp() {

    const [form, setForm] = useState({})
    const navigate = useNavigate()

    async function userRegistration (event) {
        event.preventDefault()
        const {name, password, confirmPassword} = form

        if(!isNaN(Number(name))) {
            alert("Digite um nome válido")
            return
        }

        if (password !== confirmPassword) {
            alert("Confirme sua senha corretamente")
            return
        }

        try {
            await postSignUp(form)
            navigate("/")
        } catch (error) {
            const status = error.response.status

            if (status === 409) {
                alert("Já existe um usuário com esse email")
                return
            }
            if (status === 422) {
                alert("Preencha os campos corretamente")
                return
            }
            alert("Ops! Tivemos um problema e estamos trabalhando nisso.")
        }
    }

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <form onSubmit = {userRegistration}>
                <Input placeholder = "Nome" type = "text" name = "name" required
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Input placeholder = "Email" type = "email" name = "email" required
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Input placeholder = "Senha" type = "password" name = "password" required
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Input placeholder = "Confirme a senha" type = "password" name = "confirmPassword" required
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
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