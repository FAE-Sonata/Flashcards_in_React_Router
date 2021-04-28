import React from "react";
import { deleteCard } from "../../utils/api/index";
import truncateText from "../../utils/truncateText";

export const DeckCard = ({ cardObj, browserHistory, deckViewUrl }) => {
  const handleDelete = (event) => {
    event.preventDefault();
    if(window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
      const abortController = new AbortController();
      try {
        deleteCard(cardObj['id'], abortController.signal);
      }
      catch(error) {
          return "ERROR: " + error; // <ErrorMessage error={error} />;
      }
      browserHistory.go(0); // refresh
    }
  };
  // const BASE_URL = `/users/${user['id']}`;
  return (
    <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
      <div className="border p-4 h-100 d-flex flex-column">
        <p>
          {truncateText(cardObj['front'])}
        </p>
        <p>
          {truncateText(cardObj['back'])}
        </p>
        <nav>
          <ul>
            <li>
              <button onClick={() => browserHistory.push(
                `${deckViewUrl}/cards/${cardObj['id']}/edit`)}>Edit</button>
            </li>
            <li>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </li>
          </ul>
        </nav>
      </div>
    </article>
)};

export default DeckCard;