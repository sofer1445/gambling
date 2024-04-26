import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {generateRounds} from '../../helpers/generateRounds';
import GameResult from './GameResult';

const GameRounds = ({secretNewUser, teams}) => {
    console.log(secretNewUser);
    const [rounds, setRounds] = useState([]);
    const [results, setResults] = useState([]); // Store the results of the games
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);


    useEffect(() => {
        setRounds(generateRounds(teams));
    }, [teams]);

    const startGame = (team1Name, team2Name) => {
        axios.get("http://localhost:9125/generate-result", {
            params: {
                secret: secretNewUser,
                team1Name: team1Name,
                team2Name: team2Name
            }
        })
            .then((res) => {
                console.log(res.data);
                setResults(prevResults => [...prevResults, res.data]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const nextRound = () => {
        setCurrentRoundIndex(currentRoundIndex + 1);
    };

    const backRound = () => {
        setCurrentRoundIndex(currentRoundIndex - 1);
    };

    const startRound = () => {
        for (let i = 0; i < rounds[currentRoundIndex].length; i++) {
            const game = rounds[currentRoundIndex][i];
            startGame(game.team1Name, game.team2Name);
        }
    };

    return (
        <div>
            <h2>Game Round {currentRoundIndex + 1}</h2>
            {rounds[currentRoundIndex]?.map((game, gameIndex) => (
                <div key={gameIndex}>
                    <p>{game.team1Name} vs {game.team2Name}</p>
                </div>
            ))}
            {results.map((match, matchIndex) => (
                <GameResult key={matchIndex} match={match}/>
            ))}
            <button onClick={startRound}>Start Round</button>
            <button onClick={nextRound}>Next Round</button>
            <button onClick={backRound}>Back Round</button>
            <button onClick={() => setCurrentRoundIndex(0)}>Restart</button>
        </div>
    );
};

export default GameRounds;