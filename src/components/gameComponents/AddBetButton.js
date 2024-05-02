import axios from "axios";
import { useState } from "react";

const AddBetButton = ({ secretNewUser, selectedGames, handleButtonClick , rounds }) => {
    const [betsReceived, setBetsReceived] = useState(0);
    const addBets = async () => {
        const games = Object.keys(selectedGames);
        let betsReceivedCount = 0;

        if (games.length === 0) {
            alert("Please select at least one game before placing your bets.");
            return;
        }
        for (const game of games) {
            const gameObj = rounds.find(g => `${g.team1Name} vs ${g.team2Name}` === game);
            const betOnWin = selectedGames[game] === '1' ? gameObj.team1Name : selectedGames[game] === 'X' ? 'draw' : gameObj.team2Name;
            try {
                const response = await axios.get(`http://localhost:9125/add-bet-win?secretNewUser=${secretNewUser}&betOnWin=${betOnWin}`);
                if (response.data === true) {
                    console.log(`Bet on ${game} added successfully!`);
                    betsReceivedCount++;
                } else {
                    console.log(`Failed to add bet on ${game}.`);
                }
            } catch (error) {
                console.error("Error adding bet: ", error);
            }
        }
        setBetsReceived(betsReceivedCount);
        if (betsReceivedCount === games.length) {
            alert("All bets have been received by the server.");
        }
    };
    return (
        <button onClick={addBets}>Add Bets
            {Object.keys(selectedGames).length > 0 && ` (${Object.keys(selectedGames).length})`}
        </button>
    );
};

export default AddBetButton;