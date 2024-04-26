
function generateRounds(teams) { // round robin
    const rounds = [];
    const numberOfTeams = teams.length;
    const numberOfRounds = numberOfTeams - 1;
    const numberOfGamesInRound = numberOfTeams / 2;

    for (let i = 0; i < numberOfRounds; i++) {
        const round = [];
        for (let j = 0; j < numberOfGamesInRound; j++) {
            const game = {
                team1Name: teams[(i + j) % numberOfTeams],
                team2Name: teams[(numberOfTeams - 1 - j + i) % numberOfTeams]
            };
            round.push(game);
        }
        rounds.push(round);
    }



    return rounds;
}
export { generateRounds };