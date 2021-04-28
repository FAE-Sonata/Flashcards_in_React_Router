import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { listCards } from "../../utils/api/index";
import truncateText from "../../utils/truncateText";
import DeleteDeckButton from "../Decks/DeleteDeckButton";

export const Deck = ({ deckObj }) => {
  const history = useHistory();
  const [deckCards, setDeckCards] = useState([]);
  // const [error, setError] = useState(undefined);
  useEffect(() => {
    // const abortController = new AbortController();
    setDeckCards(deckObj['cards']);
    // listCards(deckObj['id'],
    //   abortController.signal).then(setDeckCards).catch(setError);
  }, [deckObj]);
  // if (error) {
  //   return "ERROR " + error; // <ErrorMessage error={error} />;
  // }
  
  // const handleDelete = (event) => {
  //   event.preventDefault();
  //   if(window.confirm("Delete this deck? You will not be able to recover it.")) {
  //     const abortController = new AbortController();
  //     try {
  //       deleteDeck(deckObj['id'], abortController.signal);
  //     }
  //     catch(error) {
  //         return "ERROR: " + error; // <ErrorMessage error={error} />;
  //     }
  //     history.go(0); // refresh
  //   }
  // };

  const BASE_URL = `/decks/${deckObj['id']}`;
  return (
    <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
      <div className="border p-4 h-100 d-flex flex-column">
        <h2 className="font-weight-lighter flex-fill">
          {deckObj['name']}
        </h2>
        <nav>
          <ul>
            <li>
              {deckCards.length} cards
            </li>
          </ul>
        </nav>
        <p>
          {truncateText(deckObj['description'])}
        </p>
        <nav>
          <ul>
            <li>
              <button
                type="button"
                onClick={() => {history.push(BASE_URL)}}>
                View
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {history.push(`${BASE_URL}/study`)}}>
                  Study
              </button>
            </li>
            <li>
              <DeleteDeckButton deck={deckObj} browserHistory={history}/>
            </li>
          </ul>
        </nav>
      </div>
    </article>
)};

export default Deck;