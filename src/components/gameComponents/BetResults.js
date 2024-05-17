import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import calculateWinningAmount from '../../helpers/calculateWinningAmount';



const BetResults = ({  checkedBets, ratio, totalWinning}) => {
    const [winningAmount, setWinningAmount] = useState(0);
    const hasWon = totalWinning > 0;
    const cookies = new Cookies();
    const [totalOdds, setTotalOdds] = useState(cookies.get('totalOdds' , {path: "/MainPage"}));
    const [betCount, setBetCount] = useState(cookies.get('betCount' , {path: "/MainPage"}));
    useEffect(() => {
        const fetchWinningAmount = async () => {
            const amount = await calculateWinningAmount(totalOdds/betCount, totalWinning, betCount);
            setWinningAmount(amount);
        };

        fetchWinningAmount().then(r =>
            console.log(r)
        );
    }, [betCount, totalOdds, totalWinning]);

    useEffect(() => {
        setTotalOdds(cookies.get('totalOdds' , {path: "/MainPage"}));
        setBetCount(cookies.get('betCount' , {path: "/MainPage"}));
    }, [cookies.get("round")]);

    return (
        <Card style={{ width: '18rem' }}>
            {hasWon ? (
                <Card.Header>🎉 Congratulations! 🎉</Card.Header>
            ) : (
                <Card.Header>Unfortunately, no winnings this time.</Card.Header>
            )}
            <ListGroup variant="flush">
                <ListGroup.Item>Round number: {cookies.get('round')+1}</ListGroup.Item>
                <ListGroup.Item>Total odds: {totalOdds}</ListGroup.Item>
                <ListGroup.Item>The bet amount: {totalWinning}</ListGroup.Item>
                <ListGroup.Item>Winning amount: {winningAmount}</ListGroup.Item>
                <ListGroup.Item>
                    <h3>Checked Bets:</h3>
                    <ul>
                        {checkedBets.map((bet, index) => (
                            bet && bet.checkedBet && bet.checkedBet.status && (
                                <li key={index}>
                                    <p>Game: {bet.checkedBet.game.homeTeam} vs {bet.checkedBet.game.awayTeam}</p>
                                    <p>Status: Correct</p>
                                </li>
                            )
                        ))}
                    </ul>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default BetResults;