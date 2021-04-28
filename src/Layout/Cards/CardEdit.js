import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import CardForm from "./CardForm";

export const CardEdit = () => {
    const params = useParams();
    const deckId = params['deckId']; const cardId = params['cardId'];

    const [thisDeck, setThisDeck] = useState({});
    useEffect(() => {
        const abortController = new AbortController();
        async function loadSides() {
            try {
                let deckResponse = await readDeck(deckId, abortController.signal);
                setThisDeck(deckResponse);
            }
            catch(error)    {
                return "ERROR " + error; // <ErrorMessage error={error} />;
            }
        }
        loadSides();
        return (() => { abortController.abort() });
    }, [deckId]);
    
    return(
        <div>
            <header>
                <NavLink to="/">Home</NavLink> / Deck {thisDeck['name']} / Edit Card {cardId}
            </header>
            <CardForm/>
      </div>
    );
}

export default CardEdit;