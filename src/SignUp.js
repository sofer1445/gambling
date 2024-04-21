import React ,{ useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";

function SignUp(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [mail, setMail] = useState('');
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState('111');
    const navigate = useNavigate();
    const cookies = new Cookies();

    const signUp = useCallback(async () => {
        try {
            const res = await axios.post("http://localhost:9125/signUp", {
                username: username,
                password: password,
                mail: mail,
            });

            if (res.data.success) {
                cookies.set("secret", res.data.secret, {path: "/LoginPage"});
                setData(res.data.data);
                setSuccess(true);
            }
        } catch (error) {
            console.error(error);
        }
    }, [username, password, mail]);

    const validatePassword = () => {
        return password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/);
    }

    const validMail = () => {
        return mail.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    }

    const handleSuccessClick = () => {
        navigate("/LoginPage");
    }

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label>Valid Password:</label>
                    <input type="password" className="form-control" value={validPassword} onChange={(e) =>
                        setValidPassword(e.target.value)} placeholder="Enter password again" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Enter email" />
                </div>
                {validatePassword() && validMail() && <button type="submit" className="btn btn-primary" onClick={signUp}>Sign Up</button>}
                {
                    !validatePassword() && <div className="alert alert-danger">Password must contain at least one number, one lowercase letter, one uppercase letter, one special character and no spaces</div>
                }
                {
                    !validMail() && <div className="alert alert-danger">Mail must contain @ and .</div>
                }
                {
                    validPassword !== password && <div className="alert alert-danger">Passwords do not match</div>
                }
                {
                    success && <div>
                        <div>
                            {"success"}
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleSuccessClick}>Login</button>
                    </div>
                }
            </form>
        </div>
    );
}

export default SignUp;

//האם הסיסמה מכילה לפחות ספרה אחת (?=.*[0-9]).
//האם הסיסמה מכילה לפחות אות קטנה אחת (?=.*[a-z]).
//האם הסיסמה מכילה לפחות אות גדולה אחת (?=.*[A-Z]).
//האם הסיסמה מכילה לפחות תו מיוחד אחד (?=.*[@#$%^&+=]).
//האם הסיסמה אינה מכילה רווחים (?=\\S+$).
//האם אורך הסיסמה הוא בין 8 ל-20 תווים (.{8,20}$).