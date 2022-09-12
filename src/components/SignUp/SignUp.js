import { Link, useNavigate } from "react-router-dom"
import { Logo, Input, Button, Text} from "../CommomStyles/Sign.js"
import { postSignUp, handleForm } from "../../services/mywallet.js"
import { useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import styled from "styled-components"

export default function SignUp() {

    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const [load, setLoad] = useState("Cadastrar")
    const [disabled, setDisabled] = useState("")
    const [background, setBackground] = useState("#FFFFFF")
    const [color, setColor] = useState("#000000")

    async function userRegistration (event) {
        event.preventDefault()
        disabledForm()
        setTimeout(sendRegistration, 1000)
    }

    async function sendRegistration () {

        const {name, password, confirmPassword} = form

        if(!isNaN(Number(name))) {
            alert("Digite um nome válido")
            enabledForm()
            return
        }
        if (password !== confirmPassword) {
            alert("Confirme sua senha corretamente")
            enabledForm()
            return
        }

        try {
            await postSignUp(form)
            navigate("/")

        } catch (error) {

            enabledForm()
            const status = error.response.status
            if (status === 409) {
                alert("Já existe um usuário com esse email")
                return
            }
            if (status === 422) {
                alert("Preencha os campos corretamente. O nome deve conter no máximo 15 caracteres")
                return
            }
            alert("Ops! Tivemos um problema e estamos trabalhando nisso.")
        }
    }

    function disabledForm() {
        setLoad(<ThreeDots color="#FFFFFF" height={80} width={80}/>)
        setDisabled("disabled")
        setBackground("#A328D6")
        setColor("#FFFFFF")
    }

    function enabledForm() {
        setLoad("Cadastrar")
        setDisabled("")
        setBackground("#FFFFFF")
        setColor("#000000")

    }

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <form onSubmit = {userRegistration}>
                <Input placeholder = "Nome" type = "text" name = "name" required disabled = {disabled} 
                background = {background} color = {color}
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Input placeholder = "Email" type = "email" name = "email" required disabled = {disabled} 
                background = {background} color = {color}
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Input placeholder = "Senha" type = "password" name = "password" required disabled = {disabled} 
                background = {background} color = {color}
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Input placeholder = "Confirme a senha" type = "password" name = "confirmPassword" required disabled = {disabled} 
                background = {background} color = {color}
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Button type = "submit" disabled = {disabled}>{load}</Button>
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