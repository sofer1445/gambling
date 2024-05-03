import axios from 'axios';
import Cookies from 'universal-cookie';

const checkBet = async ({ idBet, homeTeam, awayTeam }) => {
    const cookies = new Cookies();
    const secretNewUser = cookies.get("secret");

    try {
        const response = await axios.get("http://localhost:9125/check-bet", {
            params: {
                secretNewUser: secretNewUser,
                idBet: idBet,
                homeTeam: homeTeam,
                awayTeam: awayTeam
            }
        });
        return { status: response.data, game: { homeTeam, awayTeam } };
    } catch (error) {
        console.error("Error checking bet: ", error);
        return { status: false, error: error.message, game: { homeTeam, awayTeam } };
    }
};

export default checkBet;