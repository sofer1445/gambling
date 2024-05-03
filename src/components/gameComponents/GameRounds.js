import React, {useCallback, useState} from 'react';
import axios from 'axios';
import GameClock from "../../styled/GameClock";
import Table from 'react-bootstrap/Table';
import GameRow from './GameRow';
import GameHistory from './GameHistory';
import {useRounds} from '../../helpers/useRounds';
import checkBet from "../../helpers/checkBet";
import getAllBets from "../../helpers/getAllBets";
import BetResults from './BetResults';
// import { deleteBets } from '../../helpers/betHelpers';
import Cookies from "universal-cookie";


const GameRounds = ({secretNewUser, teams, gameClock, setGameClock}) => {
    const rounds = useRounds(teams);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showBetResults, setShowBetResults] = useState(false);
    const [checkedBets, setCheckedBets] = useState([]);
    const [ratio, setRatio] = useState(0);
    const [totalWinning, setTotalWinning] = useState(0);
    const cookies = new Cookies();
    const [betsChecked, setBetsChecked] = useState(false);
    cookies.set("round", currentRoundIndex, {path: "/MainPage"});


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
        cookies.set("round", currentRoundIndex + 1, {path: "/MainPage"});
        setIsStartButtonDisabled(gameClock < 90);
        // deleteBets(secretNewUser);
        setGameClock(0);
        setShowBetResults(false);
        setBetsChecked(false);
    }, [gameClock, secretNewUser]);

    const showGameHistory = useCallback(() => {
        setShowHistory(true);
    }, []);

    if (showHistory) {
        return <GameHistory
            fromGame={results[0]?.id}
            toGame={results[results.length - 1]?.id}
        />;
    }

    const handleCheckAllBets = async (event) => {
        event.preventDefault();
        const checkAllBets = async () => {
            const fetchedBets = await getAllBets();
            if (fetchedBets !== null) {
                const checkedBets = [];
                let totalBets = 0;
                let correctBets = 0;
                let totalWinning = 0;
                for (const game of rounds[currentRoundIndex]) {
                    const bet = fetchedBets.find(bet =>
                        (bet.predictedWinner && (bet.predictedWinner.name === game.team1Name || bet.predictedWinner.name === game.team2Name))
                        || bet.draw
                    );
                    if (bet) {
                        totalBets++;
                        const checkedBet = await checkBet({
                            idBet: bet.idBet,
                            homeTeam: game.team1Name,
                            awayTeam: game.team2Name
                        });
                        if (checkedBet && checkedBet.status) {
                            correctBets++;
                            totalWinning += bet.betAmount;
                        }
                        checkedBets.push(checkedBet);
                    }
                }
                const ratio = correctBets / totalBets;
                if (checkedBets.length > 0 && ratio !== null) {
                    setCheckedBets(checkedBets);
                    setRatio(ratio);
                    setTotalWinning(totalWinning);
                    setShowBetResults(true);
                }else {
                    console.log("No bets to check" + checkedBets.length
                    + " ratio: " + ratio + " totalWinning: " + totalWinning

                    );
                }
            }
        };
        await checkAllBets();
        setBetsChecked(true);
    };




    return (
        <div>
            <h2>Game Round {currentRoundIndex + 1}</h2>
            <GameClock time={gameClock}/>
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
            }>Next Round
            </button>
            <button onClick={showGameHistory}
                    disabled={results.length === 0}>Show Game History
            </button>
            <button onClick={() => setCurrentRoundIndex(0)}
                    disabled={currentRoundIndex === 0}
            >Restart
            </button>
            {gameClock === 90 && (
                <form onSubmit={handleCheckAllBets}>
                    <button type="submit" disabled={betsChecked}>Check All Bets</button>
                </form>
            )}
            {showBetResults && (
                <BetResults checkedBets={checkedBets} ratio={ratio} totalWinning={totalWinning} />
            )}
        </div>
    );
}

export default GameRounds;