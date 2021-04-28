import React, { useState, useEffect } from "react";
import { useHistory, useParams, useRouteMatch, NavLink } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import StudyCard from "./StudyCard";
const MIN_CARDS = 3;

function NotEnough(numCards, browserHistory, addCardUrl) {
    return (
        <div>
            <h2>Not enough cards</h2>
            <p>
                You need at least {MIN_CARDS} cards to study. There are {numCards} cards in this 
                deck.
            </p>
            <button
                type="button"
                onClick={() => {
                    browserHistory.push(addCardUrl)}}
            >
                Add Cards</button>
        </div>
    );
}

export const Study = () => {
    const history = useHistory();
    const { url } = useRouteMatch();
    const STUDY_URL = url.substr(url.indexOf("decks") - 1)
    const DECK_URL = STUDY_URL.slice(0, STUDY_URL.indexOf("study") - 1);
    const ADD_CARD_URL = DECK_URL + "/cards/new";

    const params = useParams();
    const deckId = params['deckId'];

    const [thisDeck, setThisDeck] = useState({});
    const [cardList, setCardList] = useState([]);
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        setThisDeck({});
        const abortController = new AbortController();
        async function loadCards() {
            try {
                let response = await readDeck(deckId, abortController.signal);
                setThisDeck(response);
                setCardList(response['cards']);
            }
            catch(error)    {
                return "ERROR " + error; // <ErrorMessage error={error} />;
            }
        }
        loadCards();
        return (() => { abortController.abort() });
    }, [deckId]);
    
    return(
        <div>
            <header>
                <NavLink to="/">Home</NavLink> / {thisDeck['name']} / Study
                <h2 className="font-weight-lighter flex-fill">
                    {thisDeck['name']}
                </h2>
            </header>
            {(cardList.length < MIN_CARDS) ? (NotEnough(cardList.length,
            history, `${ADD_CARD_URL}`)) : (
                <StudyCard
                    deckName={thisDeck['name']}
                    cardList={cardList}
                    counterObj={{count: counter, setCounter: setCounter}}
                />)}
            </div>
    );
}

export default Study;