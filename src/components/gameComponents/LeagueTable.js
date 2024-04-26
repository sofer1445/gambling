import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeagueTable = () => {
    const [teams, setTeams] = useState([]);
    // const cookies = new Cookies();

    useEffect(() => {
        axios.get("http://localhost:9125/get-clubs")
            .then((res) => {
                const sortedTeams = res.data.sort((a, b) => b.points - a.points);
                setTeams(sortedTeams);

                const teamNames = sortedTeams.map(team => team.name);
                // cookies.set('teamNames', JSON.stringify(teamNames));
            });
    }, []);

    return (
        <table className="table">
            <thead>
            <tr>
                <th>Team</th>
                <th>Matches Played</th>
                <th>Wins</th>
                <th>Draws</th>
                <th>Losses</th>
                <th>Goals Scored</th>
                <th>Goals Conceded</th>
                <th>Points</th>


            </tr>
            </thead>
            <tbody>
            {teams.map((team) => (
                <tr key={team.name}>
                    <td>{team.name}</td>
                    <td>{team.matchesPlayed}</td>
                    <td>{team.wins}</td>
                    <td>{team.draws}</td>
                    <td>{team.losses}</td>
                    <td>{team.goalsScored}</td>
                    <td>{team.goalsConceded}</td>
                    <td>{team.points}</td>


                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default LeagueTable;