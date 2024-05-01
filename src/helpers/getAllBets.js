import axios from 'axios';
import Cookies from 'universal-cookie';

let cachedBets = null;

const getAllBets = async () => {
    if (cachedBets !== null) {
        return cachedBets;
    }

    const cookies = new Cookies();
    const secretNewUser = cookies.get("secret");

    try {
        const response = await axios.get("http://localhost:9125/get-bets-by-secret", {
            params: {
                secretNewUser: secretNewUser
            }
        });
        cachedBets = response.data;
        return cachedBets;
    } catch (error) {
        console.error("Error fetching bets: ", error);
        return null;
    }
};

export default getAllBets;