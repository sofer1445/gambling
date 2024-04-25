import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import DeleteUserForm from '../components/DeleteUserForm';
import LeagueTable from '../components/gameComponents/LeagueTable';


const MainPage = () => {
    const { secret } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [showLeagueTable, setShowLeagueTable] = useState(false);

    return (
        <div className="container">
            <h2>Main Page</h2>
            <button onClick={() => setShowLeagueTable(!showLeagueTable)} className="btn btn-primary">
                {showLeagueTable ? 'Hide' : 'Show'} League Table
            </button>
            {showLeagueTable && <LeagueTable />}
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