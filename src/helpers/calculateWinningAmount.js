import axios from 'axios';
import Cookies from 'universal-cookie';

const calculateWinningAmount = async (ratio, amount, betCount) => {
    const cookies = new Cookies();
    const secretUser = cookies.get("secret");

    try {
        const response = await axios.get("http://localhost:9125/calculate-winning-amount", {
            params: {
                secretUser: secretUser,
                ratio: ratio,
                amount: amount,
                betCount: betCount
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error calculating winning amount: ", error);
        return 0;
    }
};

export default calculateWinningAmount;