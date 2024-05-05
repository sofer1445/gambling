import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useRounds} from "../../helpers/useRounds";
import BetRow from './BetRow';
import Cookies from "universal-cookie";
import UserCoinsDisplay from "./UserCoinsDisplay";
import AddBetButton from "./AddBetButton";

const BettingOddsDisplay = ({ teams , index, gameClock }) => {
    const [odds, setOdds] = useState({});
    const rounds = useRounds(teams);
    const [selectedGames, setSelectedGames] = useState({});
    const [totalOdds, setTotalOdds] = useState(1);
    const [betAmount, setBetAmount] = useState(0);
    const [coins, setCoins] = useState(0);
    const [betPlaced, setBetPlaced] = useState(false);
    const [betCount, setBetCount] = useState(0); // New state variable for bet count



    useEffect(() => {
        // Load the bet count from the cookie at the start
        const savedBetCount = cookies.get('betCount');
        if (savedBetCount) {
            setBetCount(savedBetCount);
        }
    }, []);

    useEffect(() => {
        const fetchOdds = async () => {
            if (rounds[index]) {
                const promises = rounds[index].map(game => {
                    return axios.get("http://localhost:9125/get-ratio-game", {
                        params: {
                            team1Name: game.team1Name,
                            team2Name: game.team2Name
                        }
                    }).then((res) => {
                        setOdds(prevOdds => ({...prevOdds, [`${game.team1Name} vs ${game.team2Name}`]: res.data}));
                    });
                });

                await Promise.all(promises);
                console.log('All requests have completed');
            }
        };

        fetchOdds();
        setBetPlaced(false);
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
        setBetCount(prevBetCount => {
            const newBetCount = prevBetCount + 1;
            cookies.set('betCount', newBetCount); // Save the new bet count in a cookie
            return newBetCount;
        });
        setBetPlaced(true);
    };

    const handleBetAmountChange = (event) => {
        const newBetAmount = event.target.value;
        if (newBetAmount > coins) {
            alert("You cannot bet more coins than you have!");
        } else {
            setBetAmount(newBetAmount);
        }
    };

    const handleCoinsChange = (newCoins) => {
        setCoins(newCoins);
    };

    const potentialReturn = totalOdds * betAmount;

    const cookies = new Cookies();
    const secret = cookies.get("secret" );

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
                    <input type="number" value={betAmount} onChange={handleBetAmountChange} max={coins}
                           disabled={gameClock > 0}/>
                    <p>Potential return: {potentialReturn}</p>
                    <UserCoinsDisplay secretNewUser={secret} onCoinsChange={handleCoinsChange} />
                    <AddBetButton secretNewUser={secret} selectedGames={selectedGames} handleButtonClick={handleButtonClick} rounds={rounds[index]} disabled={betPlaced || gameClock > 0} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BettingOddsDisplay;