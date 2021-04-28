import React from "react";
import { NavLink } from "react-router-dom";
import DeleteDeckButton from "./DeleteDeckButton";

function DeckViewHome({deck, browserHistory}) {
    const DECK_URL = `/decks/${deck['id']}`
    return (
        <div>
            <header>
                <NavLink to="/">Home</NavLink> / {deck['name']}
            </header>
            {/* border p-4 h-100 */}
        <div className="d-flex flex-column">
            <h2 className="font-weight-lighter flex-fill">
                {deck['name']}
            </h2>
            <p>
                {deck['description']}
            </p>
            <nav>
                <ul>
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                browserHistory.push(`${DECK_URL}/edit`)}}
                        >
                            Edit
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                browserHistory.push(`${DECK_URL}/study`)}}
                        >
                            Study
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                browserHistory.push(`${DECK_URL}/cards/new`)}}
                        >
                            Add Cards</button>
                    </li>
                    <li>
                        <DeleteDeckButton deck={deck} browserHistory={browserHistory}/>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
    );
}

export default DeckViewHome;