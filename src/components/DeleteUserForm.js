import React from 'react';
import axios from 'axios';

const DeleteUserForm = ({ secret }) => {
    const handleDelete = () => {
        axios.get("http://localhost:9125/delete-user", { params: { secretNewUser: secret } })
            .then((res) => {
                if (res.data) {
                    alert("User deleted successfully");
                    // Redirect to login page or home page after successful deletion
                } else {
                    alert("Failed to delete user");
                }
            });
    }

    return (
        <button onClick={handleDelete} className="btn-danger">Delete Account</button>
    );
}

export default DeleteUserForm;