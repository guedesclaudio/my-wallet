import styled from "styled-components";

export default function Balance ({total}) {

    return (
        <Container>
            <BalanceText>SALDO</BalanceText>
            <Total color = {total > 0 ? "#03AC00" : "#C70000"}>{total}</Total>
        </Container>
    )
}

const Container = styled.div`
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