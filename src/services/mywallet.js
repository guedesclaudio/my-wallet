import axios from "axios"

const baseURL = "http://localhost:5000"

function postSignIn(userLogin) {
    const promise = axios.post(`${baseURL}/signin`, userLogin)
    return promise
}

function postSignUp(userRegistration) {
    const promise = axios.post(`${baseURL}/signup`, userRegistration)
    return promise
}

function postEntry(data, config) {
    const promise = axios.post(`${baseURL}/entry`, data, config)
    return promise
}

function postExit(data, config) {
    const promise = axios.post(`${baseURL}/exit`, data, config)
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
    handleForm
}