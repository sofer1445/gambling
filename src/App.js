import './App.css';
import React from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignUp  from "./SignUp";
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
                <div>{
                    HomePage()
                }</div>
                <BrowserRouter>
                    <NavLink style={navLinkStyle} to={"/LoginPage"} className={"nav btn btn-primary m-2"}>LoginPage</NavLink>
                    <NavLink style={navLinkStyle} to={"/SignUp"} className={"nav btn btn-primary m-2"}>SignUp</NavLink>

                    <Routes>
                        <Route path={"/LoginPage"} element={<LoginPage/>}/>
                        <Route path={"/SignUp"} element={<SignUp/>}/>


                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

}

export default App;