import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch, NavLink } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api/index";

export const AddCard = () => {
    const history = useHistory();
    const params = useParams();
    const deckId = params['deckId'];
    const { url } = useRouteMatch();
    const DECK_URL = url.substr(0, (url.length - "cards/new".length) - 1);
    
    const [thisDeck, setThisDeck] = useState({});
    const [error, setError] = useState(undefined);

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const handleFrontChange = (event) => setFront(event['target']['value']);
    const handleBackChange = (event) => setBack(event['target']['value']);

    const handleSubmit = (event) => {
        event.preventDefault();
        const partialNewCard = {front: front, back: back};
        // console.log("ADD CARD object: ", partialNewCard);
        const abortController = new AbortController();
        try {
            createCard(deckId, partialNewCard, abortController.signal);
            setFront(""); setBack("");
        }
        catch(error) {
            console.log("ERROR: " + error); // <ErrorMessage error={error} />;
        }
    };

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
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">
                    Front: 
                    <textarea
                        id="front"
                        name="front"
                        onChange={handleFrontChange}
                        value={front}
                        placeholder="Front side of card"
                    />
                </label><br/>
                <label htmlFor="back">
                    Back: 
                    <textarea
                        id="back"
                        name="back"
                        onChange={handleBackChange}
                        value={back}
                        placeholder="Back side of card"
                    />
                </label><br/>
                <button type="submit">Save</button>
                <button onClick={() => history.push(DECK_URL)}>Done</button>
            </form>
      </div>
    );
}

export default AddCard;