import React from 'react';
import {validatePassword, validMail} from '../helpers/validators';

const SignUpForm = ({username, setUsername, password, setPassword, validPassword, setValidPassword, mail, setMail, signUp, handleSuccessClick, success, errorCode, getErrorText}) => (
    <form>
        <div className="form-group">
            <label>Username:</label>
            <input type="text" className="form-control" value={username}
                   onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"/>
        </div>
        <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" value={password}
                   onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"/>
        </div>
        <div className="form-group">
            <label>Valid Password:</label>
            <input type="password" className="form-control" value={validPassword} onChange={(e) =>
                setValidPassword(e.target.value)} placeholder="Enter password again"/>
        </div>
        <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" value={mail} onChange={(e) => setMail(e.target.value)}
                   placeholder="Enter email"/>
        </div>
        {validatePassword(password) && validMail(mail) &&
            <button type="submit" className="btn btn-primary" onClick={signUp}>Sign Up</button>}
        {
            !validatePassword(password) &&
            <div className="alert alert-danger">Password must contain at least one number, one lowercase letter,
                one uppercase letter, one special character and no spaces</div>
        }
        {
            !validMail(mail) && <div className="alert alert-danger">Mail must contain @ and .</div>
        }
        {
            validPassword !== password && <div className="alert alert-danger">Passwords do not match</div>
        }
        <div>
            {success && <div className="alert alert-success">Success! <button onClick={handleSuccessClick}>Login</button>
            </div>}
            {errorCode && <div className="alert alert-danger">{getErrorText(errorCode)}</div>}
        </div>
    </form>

);

export default SignUpForm;