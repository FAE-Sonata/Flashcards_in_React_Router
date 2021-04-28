import React, { useEffect, useState } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api/index";

export const CardEdit = () => {
    const history = useHistory();
    const params = useParams();
    const deckId = params['deckId']; const cardId = params['cardId'];

    const [thisCard, setThisCard] = useState({});
    const [thisDeck, setThisDeck] = useState({});
    // const [error, setError] = useState(undefined);

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const handleFrontChange = (event) => setFront(event['target']['value']);
    const handleBackChange = (event) => setBack(event['target']['value']);
    useEffect(() => {
        setThisCard({}); setFront(""); setBack("");
        const abortController = new AbortController();
        async function loadSides() {
            try {
                let deckResponse = await readDeck(deckId, abortController.signal);
                setThisDeck(deckResponse);

                let cardResponse = await readCard(cardId, abortController.signal);
                setThisCard(cardResponse);
                setFront(cardResponse['front']); setBack(cardResponse['back']);
            }
            catch(error)    {
                return "ERROR " + error; // <ErrorMessage error={error} />;
            }
        }
        loadSides();
        return (() => { abortController.abort() });
    }, [deckId, cardId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const modifiedCard = {...thisCard, front: front, back: back};
        // console.log("CARD EDIT SUBMISSION: ", modifiedCard);
        const abortController = new AbortController();
        try {
            updateCard(modifiedCard, abortController.signal);
        }
        catch(error) {
            console.log("ERROR: " + error); // <ErrorMessage error={error} />;
        }
        history.goBack();
    };
    
    return(
        <div>
            <header>
                <NavLink to="/">Home</NavLink> / Deck {thisDeck['name']} / Edit Card {cardId}
            </header>
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
                    Description:
                    <textarea
                        id="back"
                        name="back"
                        onChange={handleBackChange}
                        value={back}
                    />
                </label>
                <button type="submit">Submit</button>
                <button onClick={() => history.goBack()}>Cancel</button>
        </form>
      </div>
    );
}

export default CardEdit;