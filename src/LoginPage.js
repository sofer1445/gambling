import React ,{ useEffect,useCallback, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPageComponent () {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errorCode, setErrorCode] = useState(null);
    const [secret, setSecret] = useState('');
    const [data, setData] = useState('111');
    const cookies = new Cookies();

    useEffect(() => {
        // componentDidMount
        const secretCookie = cookies.get("secret");
        if (secretCookie) {
            setSecret(secretCookie);
        }
    }, [cookies]);

    const handleInputChange = useCallback((key, event) => {
        if (key === 'mail') {
            setMail(event.target.value);
        } else if (key === 'password') {
            setPassword(event.target.value);
        }
    }, []);

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
            <form>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={mail} onChange={handleInputChange.bind(this, 'mail')} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={handleInputChange.bind(this, 'password')} placeholder="Enter password" />
                </div>
                {
                    secret ? (
                        <div>
                            <div>
                                {"success"}
                            </div>
                        </div>
                    ) : (
                        <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
                    )
                }

            </form>
            {errorCode && <div className="alert alert-danger">{errorCode}</div>}
        </div>
    );
}

export default LoginPageComponent;