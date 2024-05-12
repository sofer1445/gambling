import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import DeleteUserForm from '../components/DeleteUserForm';
import LeagueTable from '../components/gameComponents/LeagueTable';
import GameRounds from "../components/gameComponents/GameRounds";
import BettingOddsDisplay from "../components/gameComponents/BettingOddsDisplay";
import axios from "axios";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserInfoButton  from "../components/gameComponents/UserInfoButton";

const MainPage = () => {
    const { secret } = useParams();
    const [secretNewUser, setSecretNewUser] = useState(secret);
    const [isEditing, setIsEditing] = useState(false);
    const [showLeagueTable, setShowLeagueTable] = useState(false);
    const [teamNames, setTeamNames] = useState([]);
    const cookies = new Cookies();
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [gameClock, setGameClock] = useState(0);
    const [isLeagueTableVisible, setIsLeagueTableVisible] = useState(true);
    const [isRoundGamesVisible, setIsRoundGamesVisible] = useState(true);
    const [isOddsVisible, setIsOddsVisible] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:9125/get-name-clubs")
            .then((res) => {
                setTeamNames(res.data);
            });
    }, []);

    cookies.set("secret", secret, {path: "/MainPage"});
    return (
        <div >
            <h2>Main Page</h2>
            <div className="container main-page">
                <button onClick={() => setShowLeagueTable(!showLeagueTable)} className="btn-primary">
                    {showLeagueTable ? 'Hide' : 'Show'} League Table
                </button>
                {showLeagueTable && <LeagueTable/>}
                <button onClick={() => setIsRoundGamesVisible(!isRoundGamesVisible)} className="btn-primary">
                    {isRoundGamesVisible ? 'Hide' : 'Show'} Round Games
                </button>
                <div style={{ display: isRoundGamesVisible ? 'block' : 'none' }}>
                    {isRoundGamesVisible && <GameRounds
                        secretNewUser={secret}
                        teams={teamNames}
                        gameClock={gameClock}
                        setGameClock={setGameClock}
                    />}
                </div>
                <button onClick={() => setIsOddsVisible(!isOddsVisible)} className="btn-primary">
                    {isOddsVisible ? 'Hide' : 'Show'} Betting Odds
                </button>
                <div style={{ display: isOddsVisible ? 'block' : 'none' }}>
                    {isOddsVisible && <BettingOddsDisplay
                        teams={teamNames}
                        index={
                            cookies.get("round") ? cookies.get("round") : 0
                        }
                        gameClock={gameClock}
                    />}
                </div>
                {isEditing ? (
                    <>
                        <EditUserForm secret={secret} />
                        <button onClick={() => setIsEditing(false)} className="btn-primary">Close Edit Form</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="btn-primary">Edit Account</button>
                        <DeleteUserForm secret={secret} />
                    </>
                )}
                <button onClick={() => setShowUserInfo(!showUserInfo)} className="btn-primary"> Show User Info</button>
                {showUserInfo && <UserInfoButton secretNewUser={secretNewUser} />}
            </div>
        </div>
    );
};

export default MainPage;