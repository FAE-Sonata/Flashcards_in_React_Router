import React, { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import DeckCard from "./DeckCard";
import DeckViewHome from "./DeckViewHome";

export const DeckView = (/* { deckId = { posts: [] }} */) => {
    const history = useHistory();
    const { url } = useRouteMatch();
    const DECK_VIEW_URL = url.substr(url.indexOf("decks") - 1)
    
    const params = useParams();
    const deckId = params['deckId'];
    const [thisDeck, setThisDeck] = useState({});
    const [deckCards, setDeckCards] = useState([]);
    // const [error, setError] = useState(undefined);
    useEffect(() => {
        const abortController = new AbortController();
        // readDeck(deckId,
        //     abortController.signal).then(setThisDeck).catch(setError);
        async function loadDeckAndCards() {
            try {
                let deckResponse = await readDeck(deckId, abortController.signal);
                setThisDeck(deckResponse);
                // console.log("DECK VIEW, fetch cards from response: ", deckResponse['cards']);
                setDeckCards(deckResponse['cards']);
            }
            catch(error)    {
                return "ERROR " + error; // <ErrorMessage error={error} />;
            }
        }
        loadDeckAndCards();
        return (() => { abortController.abort() });
    }, [deckId]);

    // useEffect(() => {
    //     const abortController = new AbortController();
    //     listCards(deckId,
    //         abortController.signal).then(setDeckCards).catch(setError);
    // }, [deckId]);
    // if (error) {
    //     return "ERROR " + error; // <ErrorMessage error={error} />;
    // }

    const cardComponents = deckCards.map((cardObj) =>
        <DeckCard key={cardObj['id']}
            cardObj={cardObj}
            browserHistory={history}
            deckViewUrl={DECK_VIEW_URL}/>);
    /*
    const EDIT_DECK_URL = `${DECK_VIEW_URL}/edit`;
    const CARDS_SUBDIR = `${DECK_VIEW_URL}/cards`;
    const EDIT_CARD_URL = `${CARDS_SUBDIR}/:cardId/edit`;
    const ADD_CARD_URL = `${CARDS_SUBDIR}/new`;
    */
    return (
        /* col-12 col-md-6 col-xl-3 my-2 */
        <article className="align-self-stretch">
            {/* <header>
                <NavLink to="/">Home</NavLink> / {thisDeck['name']}
            </header> */}
            {/* OLD ROUTING CODE */}
            {/* <div className="border p-4 h-100 d-flex flex-column">
                <Route exact={true} path={DECK_VIEW_URL}>
                    <DeckViewHome
                        deck={thisDeck}
                        browserHistory={history}/>
                </Route>
                <Route path={EDIT_DECK_URL}>
                    <DeckEdit deckId={deckId} deckName={thisDeck['name']}/>
                </Route>
                <Route path={ADD_CARD_URL}>
                    <AddCard deckName={thisDeck['name']}/>
                </Route>
                <Route path={EDIT_CARD_URL}>
                    <CardEdit deckName={thisDeck['name']}/>
                </Route>
            </div>
            <Route exact={true} path={DECK_VIEW_URL}>
                <h2>Cards</h2>
                <section className="row">{cardComponents}</section>
            </Route> */}

            <div className="border p-4 h-100 d-flex flex-column">
                <DeckViewHome
                    deck={thisDeck}
                    browserHistory={history}/>
            </div>
            <h2>Cards</h2>
            <section className="row">{cardComponents}</section>
        </article>
    )};

export default DeckView;