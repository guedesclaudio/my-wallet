import styled from "styled-components"

const Logo = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    font-weight: 400;
    line-height: 50px;
    color: #FFFFFF;
    text-align: center;
`
const Input = styled.input`
    height: 58px;
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
    border: none;
    outline: none;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #000000;
    padding-left: 10px;
    box-sizing: border-box;
    background-color: ${props => props.background};

    &&::placeholder {
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        color: #000000;
        padding-left: 10px;
    }
`
const Button = styled.button`
    margin-top: 10px;
    height: 46px;
    width: 100%;
    border-radius: 5px;
    background-color: #A328D6;
    color: #FFFFFF;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &&:hover {
        filter: brightness(1.1);
    }
`
const Text = styled.p`
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    margin-top: 20px;
    text-align: center;
    color: #FFFFFF;
`
export {
    Logo,
    Input,
    Button,
    Text
}