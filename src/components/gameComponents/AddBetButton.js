import axios from "axios";
const AddBetButton = ({ secretNewUser, betOnWin, handleButtonClick }) => {
    console.log("secretNewUser: ", secretNewUser);

    console.log("betOnWin: ", betOnWin);
    const addBet = async () => {
        try {
            const response = await axios.get(`http://localhost:9125/add-bet-win?secretNewUser=${secretNewUser}&betOnWin=${betOnWin}`);
            if (response.data === true) {
                alert("Bet added successfully!");
            } else {
                alert("Failed to add bet.");
            }
        } catch (error) {
            console.error("Error adding bet: ", error);
        }
    };
    return (
        <button onClick={addBet}>Add Bet</button>
    );
};

export default AddBetButton;