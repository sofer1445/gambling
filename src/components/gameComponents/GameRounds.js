import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import GameClock from "../../styled/GameClock";
import Table from 'react-bootstrap/Table';
import GameRow from './GameRow';
import GameHistory from './GameHistory';
import { useRounds } from '../../helpers/useRounds';
import CheckBetButton from './CheckBetButton';


const GameRounds = ({ secretNewUser, teams }) => {
    const rounds = useRounds(teams);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [gameClock, setGameClock] = useState(0);
    const [results, setResults] = useState([]);
    const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);
    const [showHistory, setShowHistory] = useState(false);


    const fetchGameResults = useCallback((game) => {
        return axios.get("http://localhost:9125/generate-result", {
            params: {
                secretNewUser: secretNewUser,
                team1Name: game.team1Name,
                team2Name: game.team2Name,
            }
        }).then((res) => {
            game.result = res.data;
            game.id = res.data.idMatch;
            setResults(prevResults => [...prevResults.filter(g => g.id !== game.id), game]);
        }).catch((error) => {
            console.error("Error fetching game results: ", error);
        });
    }, [secretNewUser]);

    const startGameClock = useCallback(() => {
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
        }, 300);
    }, []);

    const startRound = useCallback(() => {
        setIsStartButtonDisabled(true);
        Promise.all(rounds[currentRoundIndex].map(fetchGameResults)).then(startGameClock);
    }, [currentRoundIndex, rounds, fetchGameResults, startGameClock]);

    const nextRound = useCallback(() => {
        setCurrentRoundIndex(prevRoundIndex => prevRoundIndex + 1);
        if (gameClock < 90) {
            setIsStartButtonDisabled(true);
        } else {
            setIsStartButtonDisabled(false);
        }
    }, [gameClock]);

    const showGameHistory = useCallback(() => {
        setShowHistory(true);
    }, []);

    if (showHistory) {
        return <GameHistory
            fromGame={results[0]?.id}
            toGame={results[results.length - 1]?.id}
        />;
    }


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
                {rounds[currentRoundIndex]?.map((game) => (
                    <GameRow game={game} result={game.result} gameClock={gameClock} key={game.id}/>
                ))}
                </tbody>
            </Table>
            <button onClick={startRound} disabled={isStartButtonDisabled}>Start Round</button>
            <button onClick={nextRound} disabled={
                currentRoundIndex === rounds.length - 1
                || gameClock < 90
            }>Next Round</button>
            <button onClick={showGameHistory}
                    disabled={results.length === 0}>Show Game History</button>
            <button onClick={() => setCurrentRoundIndex(0)}
                    disabled={currentRoundIndex === 0}
            >Restart</button>
            {gameClock === 90 && rounds[currentRoundIndex]?.map((game, i) => {
                // Determine the winning team or draw
                return (
                    <CheckBetButton
                        key={i}
                        idBet={game.id}
                        homeTeam={game.team1Name}
                        awayTeam={game.team2Name}
                    />
                );
            })}
        </div>
    );


}

export default GameRounds;