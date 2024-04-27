import React, { useEffect, useState } from 'react';
import styled, {css} from 'styled-components';


const ResultContainer = styled.div`
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    ${props => props.highlight && css`
        background-color: lightgreen;
    `}
`;

const TeamName = styled.h3`
    color: #333;
    margin: 0 10px;
    display: flex;
    flex-direction: column; // שינוי כאן
`;

const Result = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

const GameResult = ({match, gameClock}) => {
    const [result, setResult] = useState(match ? match.result : '0-0');
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        if (match) {
            const homeTeamGoalTimes = match.gameProgression.goalTimes[match.homeTeam.name].split(",");
            const awayTeamGoalTimes = match.gameProgression.goalTimes[match.awayTeam.name].split(",");
            if (homeTeamGoalTimes.includes(String(gameClock))) {
                setResult(`${parseInt(result.split('-')[0]) + 1}-${result.split('-')[1]}`);
                setHighlight(true);
            }
            if (awayTeamGoalTimes.includes(String(gameClock))) {
                setResult(`${result.split('-')[0]}-${parseInt(result.split('-')[1]) + 1}`);
                setHighlight(true);
            }
        }
    }, [gameClock, match]);

    useEffect(() => {
        if (highlight) {
            const timer = setTimeout(() => {
                setHighlight(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [highlight]);

    if (!match) {
        return null;
    }

    return (
        <ResultContainer highlight={highlight}>
            <TeamName>{match.homeTeam.name}</TeamName>
            <Result>Result: {result}</Result>
            <TeamName>{match.awayTeam.name}</TeamName>
        </ResultContainer>
    );
};

export default GameResult;