import './App.css';
import React from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignUp  from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';

const navLinkStyle = ({isActive}) => isActive ? {
    color: "white",
    backgroundColor: "red",
    margin: 50,
    align: "center",
    column: "center"

} : undefined;


class App extends React.Component {
    state = {}

    render() {
        return (
            <div id="App" className="container">
                <h1 className="text-center">Gambling Platfrom</h1>
                <BrowserRouter>
                    <NavLink style={{...navLinkStyle, backgroundColor: "burlywood" }} to={"/AboutPage"} className={"nav btn m-2"}>About</NavLink>
                    <NavLink style={{...navLinkStyle, backgroundColor: "burlywood"}} to={"/LoginPage"} className={"nav btn m-2"}>Login</NavLink>
                    <NavLink style={{...navLinkStyle, backgroundColor: "burlywood"}} to={"/SignUp"} className={"nav btn m-2"}>Sign Up</NavLink>
                    <Routes>
                        <Route path={"/AboutPage"} element={<AboutPage/>}/>
                        <Route path={"/LoginPage"} element={<LoginPage/>}/>
                        <Route path={"/SignUp"} element={<SignUp/>}/>
                        <Route path={"/MainPage/:secret"} element={<MainPage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;