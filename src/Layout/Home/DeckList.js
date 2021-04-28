import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../../utils/api/index";
import Deck from "./Deck";

export const DeckList = () => {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(setError);
    return () => abortController.abort();
  }, []); // do only once

  if (error) {
    return "ERROR " + error; // <ErrorMessage error={error} />;
  }

  const list = decks.map((deckObj) =>
    <Deck key={deckObj['id']} deckObj={deckObj} />);

  return (
    <main className="container">
      <button onClick={() => {history.push("/decks/new")}} >Create Deck</button>
      <section className="row">{list}</section>
    </main>
  );
};

export default DeckList;