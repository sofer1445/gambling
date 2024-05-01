import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const CheckBetButton = ({ idBet, homeTeam, awayTeam }) => {
    const [isBetCorrect, setIsBetCorrect] = useState(null);
    const cookies = new Cookies();
    const secretNewUser = cookies.get("secret");

    const checkBet = async () => {
        try {
            const response = await axios.get("http://localhost:9125/check-bet", {
                params: {
                    secretNewUser: secretNewUser,
                    idBet: idBet,
                    homeTeam: homeTeam,
                    awayTeam: awayTeam
                }
            });
            setIsBetCorrect(response.data);
        } catch (error) {
            console.error("Error checking bet: ", error);
        }
    };

    return (
        <div>
            <button onClick={checkBet}>Check Bet</button>
            {isBetCorrect !== null && (
                <p>{isBetCorrect ? "Your bet is correct!" : "Your bet is incorrect."}</p>
            )}
        </div>
    );
};

export default CheckBetButton;