import React from 'react';

function AboutPage() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            margin: '20px',
            border: '1px solid black',
            textAlign: 'center',
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            textShadow: "2px 2px 13px rgba(0, 0, 0, 0.5)"
        }}>
            <h2>Football League Simulation and Betting Platform</h2>
            <h3>Game Regulations:</h3>
            <h4>Game Objective:</h4>
            <p>The Football League Simulation and Betting Platform is intended for the general public and is based on game simulations and betting. It does not constitute a platform for real betting on game outcomes.</p>
            <h4>Registration and Login:</h4>
            <p>Before participating in the game, users must register and log in to the system by providing a username, email, and password.</p>
            <p>Users must maintain the privacy of their login details and not disclose them to external parties.</p>
            <h4>Betting:</h4>
            <p>Users can bet on game outcomes before they start.</p>
            <p>The betting results are based on the calculated odds according to the skill level of the participating teams.</p>
            <h4>League Rules:</h4>
            <p>The number of teams in the league will be determined by the system and must be even and at least 8 teams.</p>
            <p>Each round of games will include each competing team playing against every other team.</p>
            <h4>Prevention of External Influence:</h4>
            <p>Game managers maintain complete prevention of any form of external influence on game results.</p>
            <h4>Game Delays and Cancellations:</h4>
            <p>Game managers reserve the right to delay or cancel games in the event of technical glitches or external events that may affect game outcomes.</p>
            <h4>Betting Period:</h4>
            <p>The betting window will be available only between rounds.</p>
            <p>Users will not be able to bet on games that have already started.</p>
            <h4>Real-time Updates:</h4>
            <p>Real-time updates of game results and bets can be viewed in the user interface.</p>
            <h4>Privacy Protection:</h4>
            <p>All personal information collected will be kept confidential and will not be transferred to third parties without prior consent.</p>
            <h4>Management of Misconduct:</h4>
            <p>Game managers reserve the right to suspend users who engage in misconduct or attempt to persuade other users to exert external influence on game results.</p>
            <h4>Changes to Regulations:</h4>
            <p>Game managers reserve the right to change the game regulations at any time without prior notice.</p>
        </div>
    );
}

export default AboutPage;