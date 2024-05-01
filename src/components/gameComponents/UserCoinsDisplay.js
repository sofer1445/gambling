import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCoinsDisplay = ({ secretNewUser, onCoinsChange }) => {
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:9125/get-coins-from-user", {
            params: {
                secretNewUser: secretNewUser
            }
        }).then((res) => {
            setCoins(res.data);
            onCoinsChange(res.data);
        }).catch((error) => {
            console.error("Error fetching user coins: ", error);
        });
    }, [secretNewUser, onCoinsChange]);

    return (
        <div>
            <h2>Your Coins: {coins}</h2>
        </div>
    );
};

export default UserCoinsDisplay;