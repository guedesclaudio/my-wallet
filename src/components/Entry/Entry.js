import styled from "styled-components";
import { Input, Button } from "../CommomStyles/Sign.js"
import { handleForm, postEntry } from "../../services/mywallet.js";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext.js";

export default function Entry() {

    const [form, setForm] = useState({})
    const {config} = useContext(UserContext)

    async function sendEntry(event) {
        event.preventDefault()
        console.log(form)
        const {money, description} = form

        if(isNaN(Number(money)) || !isNaN(Number(description))) {
            alert("Preencha os campos corretamente")
        }

        try {
            await postEntry(form, config)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <form onSubmit = {sendEntry}>
                <Text>Nova Entrada</Text>
                <Input placeholder = "Valor" type = "text" name = "money" required onChange = {
                    event => {handleForm({name: event.target.name, value: event.target.value}, form, setForm)}}/>
                <Input placeholder = "Descrição" type = "text" name = "description" onChange = {
                    event => {handleForm({name: event.target.name, value: event.target.value}, form, setForm)}}/>
                <Button type = "submit">Salvar entrada</Button>
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