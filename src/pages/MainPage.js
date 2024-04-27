import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import DeleteUserForm from '../components/DeleteUserForm';
import LeagueTable from '../components/gameComponents/LeagueTable';
import GameRounds from "../components/gameComponents/GameRounds";
import axios from "axios";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
    const { secret } = useParams();
    const [secretNewUser, setSecretNewUser] = useState(secret);
    const [isEditing, setIsEditing] = useState(false);
    const [showLeagueTable, setShowLeagueTable] = useState(false);
    const [showRoundGames, setShowRoundGames] = useState(false);
    const [teamNames, setTeamNames] = useState([]);
    const cookies = new Cookies();

    useEffect(() => {
        axios.get("http://localhost:9125/get-name-clubs")
            .then((res) => {
                setTeamNames(res.data);
            });
    }, []);


    return (
        <div className="container" >
            <h2>Main Page</h2>
            <button onClick={() => setShowLeagueTable(!showLeagueTable)} className="btn btn-primary">
                {showLeagueTable ? 'Hide' : 'Show'} League Table
            </button>
            {showLeagueTable && <LeagueTable />}
            <button onClick={() => setShowRoundGames(!showRoundGames)} className="btn btn-primary">
                {showRoundGames ? 'Hide' : 'Show'} Round Games
            </button>
            {showRoundGames && <GameRounds
                secretNewUser={secret}
                teams={teamNames}
            />}
            {isEditing ? (
                <>
                    <EditUserForm secret={secret} />
                    <button onClick={() => setIsEditing(false)} className="btn btn-primary">Close Edit Form</button>
                </>
            ) : (
                <>
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Account</button>
                    <DeleteUserForm secret={secret} />
                </>
            )}
        </div>
    );
};

export default MainPage;