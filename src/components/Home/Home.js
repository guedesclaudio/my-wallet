import styled from "styled-components";
import out from "../../img/out.png"
import UserContext from "../../contexts/UserContext.js"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react"
import { getcashFlow, deleteMove } from "../../services/mywallet";


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

    console.log(callApi)

    async function removeMove() {
        const responseUser = window.confirm("Deseja mesmo deletar?")

        if(!responseUser) {
            return
        }
        
        try {
            setCallApi(callApi+1)
            await deleteMove(id, config)
        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <View>
            <div className = "view-left">
                <Date>{date}</Date>
                <Description>{description}</Description>
            </div>
            <div className = "view-right"> 
                <Money color = {type  === "entry" ? "#03AC00" : "#C70000" }>{money.replace(".", ",")}</Money>
                <ion-icon name="close-outline" onClick = {removeMove}></ion-icon>
            </div>
        </View>
    )
}

export default function Home() {

    const {userData, config} = useContext(UserContext)
    const [cashflow, setCashFlow] = useState([])
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
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
            <BoxWelcome>
                <WelcomeText>Olá, {userData.name}</WelcomeText>
                <img src = {out} onClick = {() => navigate("/")}/>
            </BoxWelcome>
            <Screen>
                <Cash>
                    {cashflow.length > 0 ? 
                    cashflow.map((value,index) => 
                    <Move key = {index} money = {value.money} description = {value.description} 
                    type = {value.type} date = {value.date}  id = {value._id} config = {config} callApi = {callApi} setCallApi = {setCallApi}/>)
                    :
                    <Text>Não há registros de entrada ou saída</Text>
                    }
                </Cash>
                {cashflow.length > 0 ? 
                <Balance>
                    <BalanceText>SALDO</BalanceText>
                    <Total color = {total > 0 ? "#03AC00" : "#C70000"}>{total}</Total>
                </Balance> : ""
                }
            </Screen>
            <Boxes>
                <Link to = {"/entry"}>
                    <Box>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <BoxText>Nova entrada</BoxText>
                    </Box>
                </Link>
                <Link to = {"/exit"}>
                    <Box>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <BoxText>Nova saída</BoxText>
                    </Box>
                </Link>
            </Boxes>
        </Container>
    )
}

const Container = styled.div`
    margin: 20px auto;
    width: 327px;
`
const BoxWelcome = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const WelcomeText = styled.h1`
    font-family: "Raleway";
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    text-align: left;
    color: #FFFFFF;
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
const Balance = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const BalanceText = styled.p`
    font-family: "Raleway";
    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
    color: #000000;
    padding-left: 10px;
`
const Total = styled(BalanceText)`
    font-weight: 400;
    padding-right: 10px;
    color: ${props => props.color};
`
const Boxes = styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Box = styled.div`
    height: 114px;
    width: 156px;
    border-radius: 5px;
    background-color: #A328D6;

    && ion-icon {
        font-size: 26px;
        color: white;
        padding-left: 10px;
        padding-top: 10px;
    }
`
const BoxText = styled.p`
    font-family: "Raleway";
    font-size: 17px;
    width: 64px;
    height: 40px;
    font-weight: 700;
    line-height: 20px;
    color: #FFFFFF;
    padding-top: 30px;
    padding-left: 10px;
`
const View = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;

    && .view-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    && .view-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    && ion-icon {
        color: #C6C6C6;
        padding-right: 4px;;
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
`
const Money = styled(Date)`
    color: ${props => props.color};
    padding-right: 10px;
    margin-left: 0px;
`