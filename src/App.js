import './App.css';
import React from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
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
                    <NavLink style={navLinkStyle} to={"/HomePage"} className={"nav btn btn-primary m-2"}>HomePage</NavLink>
                    <NavLink style={navLinkStyle} to={"/LoginPage"} className={"nav btn btn-primary m-2"}>LoginPage</NavLink>
                    <NavLink style={navLinkStyle} to={"/SignUp"} className={"nav btn btn-primary m-2"}>SignUp</NavLink>

                    <Routes>
                        <Route path={"/HomePage"} element={<HomePage/>}/>
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