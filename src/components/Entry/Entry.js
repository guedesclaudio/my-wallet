import styled from "styled-components";
import {Input,Button} from "../CommomStyles/Sign.js"

export default function Entry() {

    return (
        <Container>
            <Text>Nova Entrada</Text>
            <Input placeholder = "Valor"/>
            <Input placeholder = "Descrição"/>
            <Button>Salvar entrada</Button>
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