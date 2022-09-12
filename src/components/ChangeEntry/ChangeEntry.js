import styled from "styled-components";
import { Input, Button } from "../CommomStyles/Sign.js"
import { handleForm, putMove } from "../../services/mywallet.js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext.js";

export default function ChangeEntry() {
    
    const [form, setForm] = useState({})
    const {config} = useContext(UserContext)
    const navigate = useNavigate()
    const idMove = JSON.parse(localStorage.getItem("id"))

    async function putEntry(event) {

        event.preventDefault()
        const {money, description} = form
        const correctMoney = money?.replace(",", ".")
        
        if((correctMoney && isNaN(Number(correctMoney))) || !isNaN(Number(description))) {
            alert("Preencha os campos corretamente")
            clearInputs(money, description)
            return
        }
        
        try {
            await putMove(idMove, {...form, money: correctMoney}, config)
            navigate("/home")

        } catch (error) {
            const status = error.response.status

            if (status === 401) {
                alert("Acesso não autorizado.")
                clearInputs(money, description)
                return
            }
            if (status === 422) {
                alert("O valor deve ser válido e a descrição deve conter no máximo 20 caracteres")
                clearInputs()
                return
            }
            alert("Ops! Tivemos um problema e estamos trabalhando nisso.")
        }
    }

    function clearInputs(money, description) {
        if (money && description) {
            setForm({money: "", description: ""})
        }
        if(money && !description) {
            setForm({money: ""})
        }
        if(!money && description) {
            setForm({description: ""})
        }
    }

    return (
        <Container>
            <form onSubmit = {putEntry}>
                <Text>Editar Entrada</Text>
                <Input placeholder = "Valor" type = "text" name = "money" value = {form.money? form.money:""} onChange = { 
                    event => {handleForm({name: event.target.name, value: event.target.value}, form, setForm)}}/>
                <Input placeholder = "Descrição" type = "text" name = "description" value = {form.description? form.description:""} onChange = {
                    event => {handleForm({name: event.target.name, value: event.target.value}, form, setForm)}}/>
                <Button type = "submit">Editar entrada</Button>
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