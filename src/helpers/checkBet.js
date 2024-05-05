import axios from 'axios';
import Cookies from 'universal-cookie';

const checkBet = async ({ homeTeam, awayTeam, idBet }) => {
    const cookies = new Cookies();
    const secretNewUser = cookies.get("secret");
    console.log("Checking bet for: ", homeTeam, awayTeam, idBet);
    try {
        const response = await axios.get(`http://localhost:9125/check-bet?secretNewUser=${secretNewUser}&homeTeam=${homeTeam}&awayTeam=${awayTeam}&idBet=${idBet}`);
        return { status: response.data, game: { homeTeam, awayTeam } };
    } catch (error) {
        console.error("Error checking bet: ", error);
        return { status: false, error: error.message, game: { homeTeam, awayTeam } };
    }
};

export default checkBet;