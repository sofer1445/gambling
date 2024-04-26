import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {generateRounds} from '../../helpers/generateRounds';
import GameResult from './GameResult';


const GameRounds = ({secretNewUser, teams}) => {
    const [rounds, setRounds] = useState([]);
    const [results, setResults] = useState([]);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        setRounds(generateRounds(teams));
    }, [teams]);

    const startGame = (team1Name, team2Name, gameIndex) => {
        setIsStartButtonDisabled(true);
        axios.get("http://localhost:9125/generate-result", {
            params: {
                secretNewUser: secretNewUser,
                team1Name: team1Name,
                team2Name: team2Name
            }
        })
            .then((res) => {
                setResults(prevResults => {
                    const newResults = [...prevResults];
                    newResults[gameIndex] = res.data;
                    return newResults;
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const nextRound = () => {
        setCurrentRoundIndex(currentRoundIndex + 1);
        setIsStartButtonDisabled(false);
        setResults([]);
        clearInterval(intervalId);
    };

    const backRound = () => {
        setCurrentRoundIndex(currentRoundIndex - 1);
    };

    const startRound = () => {
        setIsStartButtonDisabled(true);
        for (let i = 0; i < rounds[currentRoundIndex].length; i++) {
            const game = rounds[currentRoundIndex][i];
            startGame(game.team1Name, game.team2Name, i);
        }

        const id = setInterval(() => {
            for (let i = 0; i < rounds[currentRoundIndex].length; i++) {
                const game = rounds[currentRoundIndex][i];
                startGame(game.team1Name, game.team2Name, i);
            }
        }, 1000);

        setIntervalId(id);

        setTimeout(() => {
            setIsStartButtonDisabled(false);
            clearInterval(id);
        }, 30000);
    };

    return (
        <div>
            <h2>Game Round {currentRoundIndex + 1}</h2>
            <table>
                <thead>
                <tr>
                    <th>Team 1</th>
                    <th>Team 2</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {rounds[currentRoundIndex]?.map((game, gameIndex) => (
                    <tr key={gameIndex}>
                        <td>{game.team1Name}</td>
                        <td>{game.team2Name}</td>
                        <td>{results[gameIndex]?.result || ''}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {results.map((match, matchIndex) => (
                <GameResult key={matchIndex} match={match}/>
            ))}
            <button onClick={startRound} disabled={isStartButtonDisabled}>Start Round</button>
            <button onClick={nextRound}>Next Round</button>
            <button onClick={backRound} disabled={currentRoundIndex === 0}>Back Round</button>
            <button onClick={() => setCurrentRoundIndex(0)}>Restart</button>
        </div>
    );
};

export default GameRounds;