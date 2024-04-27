import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { generateRounds } from '../../helpers/generateRounds';
import GameClock from "../../styled/GameClock";
import Table from 'react-bootstrap/Table';
import GameRow from './GameRow';

const GameRounds = ({ secretNewUser, teams }) => {
    const [rounds, setRounds] = useState([]);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [gameClock, setGameClock] = useState(0);
    const [results, setResults] = useState([]);
    const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);



    useEffect(() => {
        setRounds(generateRounds(teams));
    }, [teams]);

    const fetchGameResults = (game) => {
        return axios.get("http://localhost:9125/generate-result", {
            params: {
                secretNewUser: secretNewUser,
                team1Name: game.team1Name,
                team2Name: game.team2Name,
            }
        }).then((res) => {
            game.result = res.data; // Save the result in the game object
            setResults(prevResults => [...prevResults, game]); // Save the game in the results array
            return res;
        }).catch((error) => {
            console.error("Error fetching game results: ", error);
        });
    };

    const startGameClock = () => {
        setGameClock(0);
        const gameInterval = setInterval(() => {
            setGameClock(prevGameClock => {
                if (prevGameClock >= 90) {
                    clearInterval(gameInterval);
                    setIsStartButtonDisabled(false);
                    return prevGameClock;
                }
                return prevGameClock + 1;
            });
        }, 3000); // Run every 3 seconds
    };

    const startRound = () => {
        setIsStartButtonDisabled(true);
        Promise.all(rounds[currentRoundIndex].map(fetchGameResults)).then(() => {
            startGameClock();
        });
    };

    const nextRound = () => {
        setCurrentRoundIndex(prevRoundIndex => prevRoundIndex + 1);
        setResults([]); // Reset the results
        if (gameClock < 90) {
            setIsStartButtonDisabled(true);
        } else {
            setIsStartButtonDisabled(false);
        }
    };

    const backRound = () => {
        setCurrentRoundIndex(prevRoundIndex => prevRoundIndex - 1);
    };


    return (
        <div>
            <h2>Game Round {currentRoundIndex + 1}</h2>
            <GameClock time={gameClock} />
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Team 1</th>
                    <th></th>
                    <th>Team 2</th>
                    <th>Real time results</th>
                </tr>
                </thead>
                <tbody>
                {rounds[currentRoundIndex]?.map((game, gameIndex) => (
                    <GameRow game={game} result={game.result} gameClock={gameClock} key={gameIndex}/>
                ))}
                </tbody>
            </Table>
            <button onClick={startRound} disabled={isStartButtonDisabled}>Start Round</button>
            <button onClick={nextRound} disabled={
                currentRoundIndex === rounds.length - 1
                || gameClock < 90
            }>Next Round</button>
            <button onClick={backRound} disabled={currentRoundIndex === 0}>Back Round</button>
            <button onClick={() => setCurrentRoundIndex(0)}>Restart</button>
        </div>
    );
}

export default GameRounds;