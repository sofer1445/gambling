import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useRounds} from "../../helpers/useRounds";
import BetRow from './BetRow';

const BettingOddsDisplay = ({ teams , index }) => {
    const [odds, setOdds] = useState({});
    const rounds = useRounds(teams);
    const [selectedGames, setSelectedGames] = useState({});
    const [totalOdds, setTotalOdds] = useState(1);
    const [betAmount, setBetAmount] = useState(0);

    useEffect(() => {
        if (rounds[index]) {
            const promises = rounds[index].map(game => {
                return axios.get("http://localhost:9125/get-ratio-game", {
                    params: {
                        team1Name: game.team1Name,
                        team2Name: game.team2Name
                    }
                }).then((res) => {
                    console.log(res.data);
                    setOdds(prevOdds => ({...prevOdds, [`${game.team1Name} vs ${game.team2Name}`]: res.data}));
                });
            });

            Promise.all(promises).then(() => {
                console.log('All requests have completed');
            });
        }
    }, [rounds, index]);

    const handleButtonClick = (clickedGame, result) => {
        setSelectedGames(prevGames => {
            // Update the selected games
            const newSelectedGames = {...prevGames, [clickedGame]: result};

            // Calculate the new total odds
            let newTotalOdds = 1;
            for (const game in newSelectedGames) {
                if (newSelectedGames.hasOwnProperty(game)) {
                    // Use the newly selected result if the current game is the one that was just clicked
                    const selectedResult = game === clickedGame ? result : newSelectedGames[game];
                    newTotalOdds *= odds[game][selectedResult];
                }
            }

            // Keep two decimal places without rounding
            newTotalOdds = parseFloat(newTotalOdds.toFixed(2));

            setTotalOdds(newTotalOdds);

            // Return the new selected games to update the state
            return newSelectedGames;
        });
    };

    const handleBetAmountChange = (event) => {
        setBetAmount(event.target.value);
    };

    const potentialReturn = totalOdds * betAmount;

    return (
        <div>
            {odds ? (
                <div>
                    {Object.keys(odds).map((game, gameIndex) => (
                        <BetRow
                            game={game}
                            odds={odds}
                            selectedGame={selectedGames[game]}
                            handleButtonClick={handleButtonClick}
                            key={gameIndex}
                        />
                    ))}
                    <input type="number" value={betAmount} onChange={handleBetAmountChange} />
                    <p>Potential return: {potentialReturn}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BettingOddsDisplay;