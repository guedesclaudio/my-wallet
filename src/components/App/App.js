import "../reset.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from "../SignIn/SignIn.js"
import SignUp from "../SignUp/SignUp.js"
import Home from "../Home/Home.js"


export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<SignIn/>}/>
                <Route path = "/signup" element = {<SignUp/>}/>
                <Route path = "/home" element = {<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}