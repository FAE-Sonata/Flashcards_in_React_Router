import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import CardForm from "./CardForm";

export const AddCard = () => {
    const params = useParams();
    const deckId = params['deckId'];
    
    const [thisDeck, setThisDeck] = useState({});
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId,
            abortController.signal).then(setThisDeck).catch(setError);
    }, [deckId]);

    if (error) {
        return "ERROR " + error; // <ErrorMessage error={error} />;
    }
    
    return(
        <div>
            <header>
                <NavLink to="/">Home</NavLink> / {thisDeck['name']} / Add Card
            </header>
            <h2>{thisDeck['name']}</h2>
            <h3>Add Card</h3>
            <CardForm/>
      </div>
    );
}

export default AddCard;