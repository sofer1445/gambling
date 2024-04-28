import React from 'react';
import {useNavigate} from 'react-router-dom';

const LoginForm = ({mail, setMail, password, setPassword, login, secret, errorCode, getErrorText}) => {

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        login();
        if (secret) {
            navigate(`/MainPage/${secret}`);
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" value={mail}
                       onChange={(e) => setMail(e.target.value)} placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control" value={password}
                       onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"/>
            </div>
            {
                secret ? (
                    <div>
                        {
                            login && <div className="alert alert-success">Login successful</div>
                        }
                        <button onClick={() => navigate(`/MainPage/${secret}`)} className="btn btn-primary">Main Page</button>
                    </div>
                ) : (
                    <button type="submit" className="btn btn-primary">Login</button>
                )
            }
            {errorCode && <div className="alert alert-danger">{getErrorText(errorCode)}</div>}
        </form>
    );
}

export default LoginForm;