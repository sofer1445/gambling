import React from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
    width: 80px; // Reduce the size of the clock
    height: 80px; // Reduce the size of the clock
    border: 12px solid #000; // Reduce the size of the border
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

const ClockFace = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transform: rotate(90deg);
`;

const Hand = styled.div`
    width: 50%;
    height: 5px; // Reduce the size of the hand
    background: #000;
    position: absolute;
    top: 50%;
    transform-origin: right;
    right: 50%;
    transform: rotate(${props => props.time * 6}deg);
`;

const TimeLabel = styled.div`
    position: absolute;
    top: 50%;
    right: auto; 
    transform: translateY(-50%); // Vertically center the label
    font-size: 18px;
    font-weight: bold;
`;

const GameClock = ({time}) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <ClockContainer>
                <ClockFace>
                    <Hand time={time} />
                </ClockFace>
            </ClockContainer>
            <TimeLabel>{time} min</TimeLabel>
        </div>
    );
};

export default GameClock;