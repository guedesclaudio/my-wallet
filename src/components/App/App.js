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
                <Route path = "/SignUp" element = {<SignUp/>}/>
                <Route path = "/Home" element = {<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}