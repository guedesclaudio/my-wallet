import styled from "styled-components";
import UserContext from "../../contexts/UserContext.js"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react"
import { getcashFlow, deleteMove } from "../../services/mywallet";
import Boxes from "../Boxes/Boxes";
import BoxWelcome from "../BoxWelcome/BoxWelcome";
import Balance from "../Balance/Balance.js";

function Move({
    money, 
    description, 
    type, 
    date, 
    config, 
    id,
    callApi,
    setCallApi
}) {

    const navigate = useNavigate()
    const route = type === "entry" ? "changeentry" : "changeexit"

    function editMove() {
        localStorage.setItem("id", JSON.stringify(id))
        navigate(`/${route}`)
    }

    async function removeMove() {
        const responseUser = window.confirm("Deseja mesmo deletar?")

        if(!responseUser) {
            return
        }
        
        try {
            setCallApi(callApi+1)
            await deleteMove(id, config)
        } catch (error) {
            const status = error.response.status

            if (status === 401) {
                alert("Acesso não autorizado")
                return
            }
            if (status === 404) {
                alert("Movimentação não encontrada")
                return
            }
            alert("Ops! Tivemos um problema e estamos trabalhando nisso.")
        } 
    }

    return (
        <View>
            <div>
                <Date>{date}</Date>
                <Description onClick = {editMove}>{description}</Description>
            </div>
            <div> 
                <Money color = {type  === "entry" ? "#03AC00" : "#C70000" }>{money.replace(".", ",")}</Money>
                <ion-icon name="close-outline" onClick = {removeMove}></ion-icon>
            </div>
        </View>
    )
}

export default function Home() {

    const {config} = useContext(UserContext)
    const [cashflow, setCashFlow] = useState([])
    const [total, setTotal] = useState(0)
    const [callApi, setCallApi] = useState(0)

    useEffect(async () => {

        try {
            const response = await getcashFlow(config)
            setCashFlow([...response.data[0].cashflow.reverse()])
            setTotal(response.data[1].total)
            
        } catch (error) {
            console.log(error)
        }
    }, [callApi])

    return (
        <Container>
            <BoxWelcome/>
            <Screen>
                <Cash>
                    {cashflow.length > 0 ? 
                    cashflow.map((value,index) => 
                    <Move key = {index} money = {value.money} description = {value.description} 
                    type = {value.type} date = {value.date}  id = {value._id} config = {config} 
                    callApi = {callApi} setCallApi = {setCallApi}/>)
                    :
                    <Text>Não há registros de entrada ou saída</Text>
                    }
                </Cash>
                {cashflow.length > 0 ? <Balance total = {total}/> : ""}
            </Screen>
            <Boxes/>
        </Container>
    )
}

const Container = styled.div`
    margin: 20px auto;
    width: 327px;
`
const Screen = styled.div`
    margin-top: 20px;
    min-height: 446px;
    width: 326px;
    border-radius: 5px;
    background-color: #FFFFFF;
`
const Cash = styled.div`
    min-height: 414px;
`
const Text = styled.p`
    padding-top: 60%;
    text-align: center;
    font-family: "Raleway";
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #868686;
`
const View = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;

    && div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    && ion-icon {
        color: #C6C6C6;
        padding-right: 4px;
        cursor: pointer;
    }
`
const Date = styled.p`
    font-family: "Raleway";
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: #C6C6C6;
    margin-left: 10px;
`
const Description = styled(Date)`
    color: #000000;
    margin-left: 20px;
    cursor: pointer;
`
const Money = styled(Date)`
    color: ${props => props.color};
    padding-right: 10px;
    margin-left: 0px;
`