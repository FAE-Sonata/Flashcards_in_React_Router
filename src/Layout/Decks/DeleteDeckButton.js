import React from "react";
import { useParams } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";

function DeleteDeckButton({deck, browserHistory}) {
  const params = useParams();
  const deckId = params['deckId'];
  const handleDelete = (event) => {
      event.preventDefault();
      if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
        const abortController = new AbortController();
        try {
          deleteDeck(deck['id'], abortController.signal);
        }
        catch(error) {
            return "ERROR: " + error; // <ErrorMessage error={error} />;
        }
        if(deckId) browserHistory.push("/");
        else browserHistory.go(0); // refresh if home
      }
    };
  return (
      <button className="btn btn-danger" onClick={handleDelete} >Delete</button>
  );
}

export default DeleteDeckButton;