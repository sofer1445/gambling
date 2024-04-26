import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const TeamName = styled.h3`
    color: #333;
`;

const Result = styled.p`
    font-size: 18px;
    font-weight: bold;
`;

const GameResult = ({ match }) => {
    if (!match) {
        return null;
    }

    return (
        <ResultContainer>
            <TeamName>{match.homeTeam.name} vs {match.awayTeam.name}</TeamName>
            <Result>Result: {match.result}</Result>
            <p>Game Progression:</p>
            <p>{match.gameProgression.team1InitialStrength}</p>
            <p>{match.gameProgression.team2InitialStrength}</p>
            <p>{match.gameProgression.team1FinalStrength}</p>
            <p>{match.gameProgression.team2FinalStrength}</p>
        </ResultContainer>
    );
};

export default GameResult;