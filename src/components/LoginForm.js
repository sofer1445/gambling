import React from 'react';

const LoginForm = ({mail, setMail, password, setPassword, login, secret, errorCode, getErrorText}) => (
    <form>
        <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" value={mail}
                   onChange={(e) => setMail(e.target.value)} placeholder="Enter email" />
        </div>
        <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" value={password}
                   onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
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
        {errorCode && <div className="alert alert-danger">{getErrorText(errorCode)}</div>}
    </form>
);

export default LoginForm;