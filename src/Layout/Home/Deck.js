import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import truncateText from "../../utils/truncateText";
import DeleteDeckButton from "../Decks/DeleteDeckButton";

export const Deck = ({ deckObj }) => {
  const history = useHistory();
  const [deckCards, setDeckCards] = useState([]);
  useEffect(() => {
    setDeckCards(deckObj['cards']);
  }, [deckObj]);

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