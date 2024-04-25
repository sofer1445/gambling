import React, { useState } from 'react';
import axios from 'axios';

const EditUserForm = ({ secret }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [editUsername, setEditUsername] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [editMail, setEditMail] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const params = { secretNewUser: secret };
        if (editUsername) params.username = username;
        if (editPassword) params.password = password;
        if (editMail) params.mail = mail;

        axios.get("http://localhost:9125/edit-user", { params })
            .then((res) => {
                if (res.data) {
                    alert("User updated successfully");
                } else {
                    alert("Failed to update user");
                }
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>
                    <input type="checkbox" checked={editUsername} onChange={(e) => setEditUsername(e.target.checked)} />
                    Edit Username
                </label>
                <input type="text" className="form-control" value={username}
                       onChange={(e) => setUsername(e.target.value)} placeholder="Enter new username" disabled={!editUsername}/>
            </div>
            <div className="form-group">
                <label>
                    <input type="checkbox" checked={editPassword} onChange={(e) => setEditPassword(e.target.checked)} />
                    Edit Password
                </label>
                <input type="password" className="form-control" value={password}
                       onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" disabled={!editPassword}/>
            </div>
            <div className="form-group">
                <label>
                    <input type="checkbox" checked={editMail} onChange={(e) => setEditMail(e.target.checked)} />
                    Edit Email
                </label>
                <input type="email" className="form-control" value={mail}
                       onChange={(e) => setMail(e.target.value)} placeholder="Enter new email" disabled={!editMail}/>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    );
}

export default EditUserForm;