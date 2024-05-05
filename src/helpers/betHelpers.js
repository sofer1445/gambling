// betHelpers.js
import axios from 'axios';

export const deleteBets = (secretNewUser) => {
    axios.get("http://localhost:9125/delete-bets-user", {
        params: {
            secretNewUser: secretNewUser
        }
    }).then((res) => {
        if(res.data) {
            console.log("Bets deleted successfully");
        } else {
            console.log("Failed to delete bets");
        }
    }).catch((error) => {
        console.error("Error deleting bets: ", error);
    });
};