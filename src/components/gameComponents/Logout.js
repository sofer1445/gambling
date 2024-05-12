import React from 'react';


const Logout = ({ isAuthenticated, setIsAuthenticated }) => {

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setTimeout(() => {
            alert("התנתקת בהצלחה");
        }, 1000);
    };

    return (
        <button
            onClick={logout}
            disabled={!isAuthenticated}
            style={{ opacity: isAuthenticated ? 1 : 0.5 }}
        >
            התנתק
        </button>
    );
};

export default Logout;