import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const GameHistory = ({fromGame, toGame}) => {
    const [history, setHistory] = useState([]);


    const fetchAllMatches = () => {
        return axios.get("http://localhost:9125/get-all-matches")
            .then((res) => {
                if (res.data) {
                    const firstSeenGameId = fromGame ? fromGame : 0;
                    const lastSeenGameId = toGame ? toGame : res.data[res.data.length - 1].idMatch;
                    const filteredMatches = res.data.filter(
                        game => game.idMatch >= firstSeenGameId && game.idMatch <= lastSeenGameId);
                    setHistory(filteredMatches);
                }
            }).catch((error) => {
                console.error("Error fetching all matches: ", error);
            });
    };

    useEffect(() => {
        fetchAllMatches();
    }, []);

    const getLastSeenGameId = () => {
        if (toGame) {
            return toGame;
        } else {
            return 0;
        }

    }

    return (
        <div>
            <h2>Game History</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Team 1</th>
                    <th></th>
                    <th>Team 2</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {history.map((game, index) => (
                    <tr key={index}>
                        <td>{game.homeTeam.name}</td>
                        <td>vs</td>
                        <td>{game.awayTeam.name}</td>
                        <td>{game.result}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default GameHistory;