import React ,{ useEffect,useCallback, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../components/LoginForm';
import {getErrorText} from '../helpers/errorTexts';
import {useNavigate} from "react-router-dom";

function LoginPage () {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errorCode, setErrorCode] = useState(null);
    const [secret, setSecret] = useState('');
    const [data, setData] = useState('111');
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        // componentDidMount
        const secretCookie = cookies.get("secret");
        if (secretCookie) {
            setSecret(secretCookie);
        }
    }, [cookies]);

    const login = useCallback(() => {
        axios.get("http://localhost:9125/login", {
            params: {
                mail: mail,
                password: password,
            }
        }).then((res) => {
            if (res.data.success) {
                cookies.set("secret ", res.data.secret, {path: "/LoginPage"});
                setSecret(res.data.secret);
                setData(res.data.data);
            } else {
                setErrorCode(res.data.errorCode);
            }
        });

    }, [mail, password]);

    return (
        <div className="container">
            <h2>Login</h2>
            <LoginForm
                mail={mail}
                setMail={setMail}
                password={password}
                setPassword={setPassword}
                login={login}
                secret={secret}
                errorCode={errorCode}
                getErrorText={getErrorText}

            />

        </div>
    );
}

export default LoginPage