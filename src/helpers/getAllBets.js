import axios from 'axios';
import Cookies from 'universal-cookie';

const getAllBets = async () => {
    const cookies = new Cookies();
    const secretNewUser = cookies.get("secret");

    try {
        const response = await axios.get("http://localhost:9125/get-bets-by-secret", {
            params: {
                secretNewUser: secretNewUser
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching bets: ", error);
        return null;
    }
};

export default getAllBets;