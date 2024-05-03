import React from 'react';

const BetResults = ({ checkedBets, ratio, totalWinning }) => {
    return (
        <div>
            <h2>Bet Results</h2>
            <p>Winning ratio: {ratio}</p>
            <p>Total winning: {totalWinning}</p>
            <h3>Checked Bets:</h3>
            <ul>
                {checkedBets.map((bet, index) => (
                    bet && (
                        <li key={index}>
                            <p>Bet ID: {bet.idBet}</p>
                            <p>Game: {bet.game.homeTeam} vs {bet.game.awayTeam}</p>
                            <p>Status: {bet.status ? "Correct" : "Incorrect"}</p>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default BetResults;