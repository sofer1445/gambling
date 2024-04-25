import React, {useCallback, useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import SignUpForm from '../components/SignUpForm';
import {getErrorText} from '../helpers/errorTexts';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [mail, setMail] = useState('');
    const [success, setSuccess] = useState(localStorage.getItem('success') === 'true');
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [errorCode, setErrorCode] = useState(null);

    useEffect(() => {
        localStorage.setItem('success', success);
    }, [success]);

    const signUp = useCallback(async () => {
        try {
            const res = await axios.post("http://localhost:9125/sign-up", null, {
                params: {
                    username: username,
                    password: password,
                    mail: mail,
                }
            });
            if (res.data === 0) { // 0 can be considered as success
                console.log("success");
                setSuccess(true);
            } else {
                setErrorCode(res.data);
            }

        } catch (e) {
            console.error(e);
        }
    }, [username, password, mail]);

    const handleSuccessClick = () => {
        navigate("/LoginPage");
    }

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <SignUpForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                validPassword={validPassword}
                setValidPassword={setValidPassword}
                mail={mail}
                setMail={setMail}
                signUp={signUp}
                handleSuccessClick={handleSuccessClick}
                success={success}
                errorCode={errorCode}
                getErrorText={getErrorText}
            />
        </div>
    );
}

export default SignUp;