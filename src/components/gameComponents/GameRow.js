import GameResult from "./GameResult";

const GameRow = ({game, result, gameClock}) => {
    return (
        <tr>
            <td>{game.team1Name}</td>
            <td>vs</td>
            <td>{game.team2Name}</td>
            <td><GameResult match={result} gameClock={gameClock} /></td>
        </tr>
    );
};
export default GameRow;