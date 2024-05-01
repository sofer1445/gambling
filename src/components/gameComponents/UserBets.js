import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const UserBets = () => {
    const [bets, setBets] = useState([]);
    const cookies = new Cookies();
    const secretNewUser = cookies.get("secret");

    useEffect(() => {
        const fetchBets = async () => {
            try {
                const response = await axios.get("http://localhost:9125/get-bets-by-secret", {
                    params: {
                        secretNewUser: secretNewUser
                    }
                });
                setBets(response.data);
            } catch (error) {
                console.error("Error fetching bets: ", error);
            }
        };

        fetchBets();
    }, [secretNewUser]);

    return (
        <div>
            <h2>User Bets</h2>
            {bets.map((bet, index) => (
                <div key={index}>
                    <p>{bet.team1Name} vs {bet.team2Name}</p>
                    <p>Bet on: {bet.betOnWin}</p>
                    <p>Amount: {bet.amount}</p>
                </div>
            ))}
        </div>
    );
};

export default UserBets;