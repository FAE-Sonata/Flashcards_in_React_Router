import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, updateCard, createCard } from "../../utils/api/index";

export const CardForm = () => {
    const history = useHistory();
    const params = useParams();
    const deckId = params['deckId']; const cardId = params['cardId'];

    const [thisCard, setThisCard] = useState({});

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const handleFrontChange = (event) => setFront(event['target']['value']);
    const handleBackChange = (event) => setBack(event['target']['value']);
    useEffect(() => {
        setThisCard({}); setFront(""); setBack("");
        const abortController = new AbortController();
        async function loadSides() {
            try {
                let cardResponse = await readCard(cardId, abortController.signal);
                setThisCard(cardResponse);
                setFront(cardResponse['front']); setBack(cardResponse['back']);
            }
            catch(error)    {
                return "ERROR " + error; // <ErrorMessage error={error} />;
            }
        }
        // form reached via Edit Card
        if(cardId) loadSides();
        return (() => { abortController.abort() });
    }, [cardId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let modifiedCard, partialNewCard;
        if(cardId) modifiedCard = {...thisCard, front: front, back: back};
        else partialNewCard = {front: front, back: back};
        const abortController = new AbortController();
        try {
            if(cardId) updateCard(modifiedCard, abortController.signal);
            else {
                createCard(deckId, partialNewCard, abortController.signal);
                setFront(""); setBack(""); // reset form
            }
        }
        catch(error) {
            console.log("ERROR: " + error); // <ErrorMessage error={error} />;
        }
        if(cardId) history.goBack();
    };
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="front">
                Front: 
                <textarea
                    id="front"
                    name="front"
                    onChange={handleFrontChange}
                    value={front}
                />
            </label>
            <label htmlFor="back">
                Back: 
                <textarea
                    id="back"
                    name="back"
                    onChange={handleBackChange}
                    value={back}
                />
            </label>
            <button type="submit">Submit</button>
            <button onClick={() => history.push(`/decks/${deckId}`)}>
                {(cardId) ? "Cancel": "Done"}
            </button>
        </form>
    );
}

export default CardForm;