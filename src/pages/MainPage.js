import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';

const MainPage = () => {
    const { secret } = useParams();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="container">
            <h2>Main Page</h2>
            <p>Secret: {secret}</p>
            {isEditing ? (
                <EditUserForm secret={secret} />
            ) : (
                <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Account</button>
            )}
        </div>
    );
};

export default MainPage;