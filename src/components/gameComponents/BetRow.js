import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const BetRow = ({ game, odds, handleButtonClick }) => {
    const [team1, team2] = game.split(' vs ');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleClick = (option) => {
        setSelectedOption(option);
        handleButtonClick(game, option);
    };

    return (
        <div key={game} style={{display: 'flex', justifyContent: 'space-around', marginBottom: '1em'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p>Home Team</p>
                <Button
                    variant={selectedOption === '1' ? "warning" : "light"}
                    onClick={() => handleClick('1')}
                    style={{width: '100%', fontSize: '1.2em'}}
                >
                    {team1}: ({odds[game]['1']})
                </Button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p>Draw</p>
                <Button
                    variant={selectedOption === 'X' ? "warning" : "light"}
                    onClick={() => handleClick('X')}
                    style={{width: '100%', fontSize: '1.2em'}}
                >
                    X: ({odds[game]['X']})
                </Button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p>Away Team</p>
                <Button
                    variant={selectedOption === '2' ? "warning" : "light"}
                    onClick={() => handleClick('2')}
                    style={{width: '100%', fontSize: '1.2em'}}
                >
                    {team2}: ({odds[game]['2']})
                </Button>
            </div>
        </div>
    );
};

export default BetRow;