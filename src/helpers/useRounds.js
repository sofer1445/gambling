import { useState, useEffect } from 'react';
import {generateRounds} from "./generateRounds";

export const useRounds = (teams) => {
    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        setRounds(generateRounds(teams));
    }, [teams]);

    return rounds;
};