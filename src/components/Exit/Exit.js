import styled from "styled-components";
import {Input,Button} from "../CommomStyles/Sign.js"
import { useState, useContext } from "react";
import { handleForm, postExit } from "../../services/mywallet.js";
import UserContext from "../../contexts/UserContext.js";

export default function Exit() {

    const [form, setForm] = useState({})
    const {config} = useContext(UserContext)

    async function sendExit(event) {
        event.preventDefault()
        console.log(form, config)
        const {money, description} = form

        if(isNaN(Number(money)) || !isNaN(Number(description))) {
            alert("Preencha os campos corretamente")
        }

        try {
            await postExit(form, config)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <form onSubmit = {sendExit}>
                <Text>Nova Saída</Text>
                <Input placeholder = "Valor" type = "text" name = "money" required onChange = {
                event => {handleForm({name: event.target.name, value: event.target.value}, form, setForm)}}/>
                <Input placeholder = "Descrição" type = "text" name = "description" onChange = {
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