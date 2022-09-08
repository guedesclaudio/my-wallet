import { Logo, Input, Button, Text } from "../CommomStyles/Sign.js"
import { Link, useNavigate } from "react-router-dom"
import { postSignIn, handleForm } from "../../services/mywallet.js"
import { useContext, useState } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext.js"

export default function SignIn() {

    const {userData, setUserData, config, setConfig} = useContext(UserContext)
    const [form, setForm] = useState({})
    const navigate = useNavigate()

    async function userLogin (event) {
        event.preventDefault()
        
        try {
            const response = await postSignIn(form)
            const {token, name} = response.data
            const {email, password} = form
            
            localStorage.setItem("user", JSON.stringify({...form, token, name}))
            setUserData({...userData, email, password, token, name})
            setConfig({...config, 
                headers: {
                    "Authorization": `Bearer ${token}`
            }})

            navigate("/home")

        } catch (error) {
            const status = error.response.status

            if (status === 404 || status === 401) {
                alert("Usuário ou senha inválidos.")
                return
            }
            alert("Ops! Tivemos um problema e estamos trabalhando nisso.")
        }
    }

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <form onSubmit = {userLogin}>
                <Input placeholder = "Email" type = "email" name = "email" required
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Input placeholder = "Senha" type = "password" name = "password" required
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
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