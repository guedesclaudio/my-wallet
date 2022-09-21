import axios from "axios"

//const baseURL = "http://localhost:5000"
const baseURL = "https://my-wallet-backend-api.herokuapp.com"

function postSignIn(userLogin) {
    const promise = axios.post(`${baseURL}/signin`, userLogin)
    return promise
}

function postSignUp(userRegistration) {
    const promise = axios.post(`${baseURL}/signup`, userRegistration)
    return promise
}

function postEntry(data, config) {
    const promise = axios.post(`${baseURL}/entries`, data, config)
    return promise
}

function postExit(data, config) {
    const promise = axios.post(`${baseURL}/exits`, data, config)
    return promise
}

function getcashFlow(config) {
    const promise = axios.get(`${baseURL}/cashflow`, config)
    return promise
}

function deleteMove(id, config) {
    const promise = axios.delete(`${baseURL}/deletemove/${id}`, config)
    return promise
}

function putMove(id, data, config) {
    const promise = axios.put(`${baseURL}/putmove/${id}`, data,  config)
    return promise
}

function handleForm ({name, value}, form, setForm) {
    setForm({
        ...form,
        [name] : value
    })
}

export {
    postSignIn,
    postSignUp,
    postEntry,
    postExit,
    getcashFlow,
    deleteMove,
    putMove,
    handleForm
}