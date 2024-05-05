import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const BetResults = ({ checkedBets, ratio, totalWinning }) => {
    const hasWon = totalWinning > 0;

    return (
        <Card style={{ width: '18rem' }}>
            {hasWon ? (
                <Card.Header>🎉 Congratulations! 🎉</Card.Header>
            ) : (
                <Card.Header>Unfortunately, no winnings this time.</Card.Header>
            )}
            <ListGroup variant="flush">
                <ListGroup.Item>Winning ratio: {ratio}</ListGroup.Item>
                <ListGroup.Item>Total winning: {totalWinning}</ListGroup.Item>
                <ListGroup.Item>
                    <h3>Checked Bets:</h3>
                    <ul>
                        {checkedBets.map((bet, index) => (
                            bet && bet.game && (
                                <li key={index}>
                                    <p>Bet ID: {bet.idBet}</p>
                                    <p>Game: {bet.game.team1Name} vs {bet.game.team2Name}</p>
                                    <p>Status: {bet.status ? "Correct" : "Incorrect"}</p>
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