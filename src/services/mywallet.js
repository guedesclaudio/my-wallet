import axios from "axios"

const baseURL = "https://localhost:5000"

function postSignIn(userLogin) {
    const promise = axios.post(`${baseURL}/signin`, userLogin)
    return promise
}

function postSignUp(userRegistration) {
    const promise = axios.post(`${baseURL}/signup`, userRegistration)
}

export {
    postSignIn,
    postSignUp
}