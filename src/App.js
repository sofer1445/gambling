import './App.css';
import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';

const navLinkStyle = {
    color: "white",
    backgroundColor: "burlywood",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    textDecoration: 'none',



};

class App extends React.Component {
    state = {}

    render() {
        return (
            <div id="App" className="container d-flex flex-column align-items-center">
                <h1 className="text-center">Gambling Platform</h1>
                <BrowserRouter>
                    <nav className="d-flex flex-row">
                        <NavLink style={navLinkStyle} to={"/AboutPage"} className={"nav btn m-2"}>About</NavLink>
                        <NavLink style={navLinkStyle} to={"/LoginPage"} className={"nav btn m-2"}>Login</NavLink>
                        <NavLink style={navLinkStyle} to={"/SignUp"} className={"nav btn m-2"}>Sign Up</NavLink>
                        <NavLink style={navLinkStyle} to={"/Logout"} className={"nav btn m-2"}>Log out</NavLink>
                    </nav>
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