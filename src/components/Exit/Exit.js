import styled from "styled-components";
import {Input,Button} from "../CommomStyles/Sign.js"
import { useState, useContext } from "react";
import { handleForm, postExit } from "../../services/mywallet.js";
import UserContext from "../../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";

export default function Exit() {

    const [form, setForm] = useState({})
    const [money, setMoney] = useState(0)
    const {config} = useContext(UserContext)
    const navigate = useNavigate()

    async function sendExit(event) {
        event.preventDefault()
        const {money, description} = form
        const correctMoney = money.replace(",", ".")

        if(isNaN(Number(correctMoney)) || !isNaN(Number(description))) {
            alert("Preencha os campos corretamente")
            return
        }

        try {
            await postExit({...form, money: correctMoney}, config)
            navigate("/home")

        } catch (error) {
            const status = error.response.status

            if (status === 401) {
                alert("Acesso não autorizado.")
                return
            }
            if (status === 422) {
                alert("O valor deve ser válido e a descrição deve conter no máximo 20 caracteres")
                return
            }
            alert("Ops! Tivemos um problema e estamos trabalhando nisso.")
        }
    }

    return (
        <Container>
            <form onSubmit = {sendExit}>
                <Text>Nova Saída</Text>
                <Input placeholder = "Valor" type = "text" name = "money" required onChange = {
                event => {handleForm({name: event.target.name, value: event.target.value}, form, setForm)}}/>
                <Input placeholder = "Descrição" type = "text" name = "description" required onChange = {
                event => {handleForm({name: event.target.name, value: event.target.value}, form, setForm)}}/>
                <Button type = "submit">Salvar saída</Button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    width: 327px;
    margin: 20px auto;
`
const Text = styled.div`
    font-family: "Raleway";
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    color: #FFFFFF;
`