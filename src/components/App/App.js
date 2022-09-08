import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "../SignIn/SignIn.js"
import SignUp from "../SignUp/SignUp.js"
import Home from "../Home/Home.js"
import Entry from "../Entry/Entry.js"
import Exit from "../Exit/Exit.js"
import ChangeEntry from "../ChangeEntry/ChangeEntry.js"
import ChangeExit from "../ChangeExit/ChangeExit.js"
import UserContext from "../../contexts/UserContext"
import "../reset.css"


export default function App() {

    const [userData, setUserData] = useState(
        localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    )
    const [config, setConfig] = useState(
        localStorage.getItem("user") ? {headers: {"Authorization": `Bearer ${userData.token}`}} : null
    )

    return (
        <UserContext.Provider
        value = {{
            userData, setUserData, 
            config, setConfig
            }}>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<SignIn/>}/>
                    <Route path = "/signup" element = {<SignUp/>}/>
                    <Route path = "/home" element = {<Home/>}/>
                    <Route path = "/entry" element = {<Entry/>}/>
                    <Route path = "/exit" element = {<Exit/>}/>
                    <Route path = "/changeentry" element = {<ChangeEntry/>}/>
                    <Route path = "/changeexit" element = {<ChangeExit/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}