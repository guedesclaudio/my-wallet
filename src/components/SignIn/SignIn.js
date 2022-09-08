import { Logo, Input, Button, Text } from "../CommomStyles/Sign.js"
import { Link, useNavigate } from "react-router-dom"
import { postSignIn, handleForm } from "../../services/mywallet.js"
import { useContext, useState } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext.js"
import { ThreeDots } from "react-loader-spinner"

export default function SignIn() {

    const {userData, setUserData, config, setConfig} = useContext(UserContext)
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const [load, setLoad] = useState("Entrar")
    const [disabled, setDisabled] = useState("")
    const [background, setBackground] = useState("#FFFFFF")

    function userLogin (event) {

        event.preventDefault()
        setLoad(<ThreeDots color="#FFFFFF" height={80} width={80}/>)
        setDisabled("disabled")
        setBackground("#A328D6")
        setTimeout(sendLogin, 1000)
    }

    async function sendLogin() {
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
            setLoad("Entrar")
            setDisabled("")
            setBackground("#FFFFFF")
            
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
                <Input placeholder = "Email" type = "email" name = "email" required disabled = {disabled} background = {background}
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Input placeholder = "Senha" type = "password" name = "password" required disabled = {disabled} background = {background}
                onChange = {event => handleForm({name: event.target.name, value: event.target.value}, form, setForm)}/>
                <Button type = "submit" disabled = {disabled}>{load}</Button>
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