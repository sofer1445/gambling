import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import getAllBets from '../../helpers/getAllBets';

const UserBets = () => {
    const [bets, setBets] = useState([]);
    const cookies = new Cookies();
    const secretNewUser = cookies.get("secret");

    useEffect(() => {
        const fetchBets = async () => {
            const fetchedBets = await getAllBets();
            if (fetchedBets !== null) {
                setBets(fetchedBets);
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