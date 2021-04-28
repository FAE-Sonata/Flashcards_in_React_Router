import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

export const CreateDeck = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const handleNameChange = (event) => setName(event['target']['value']);
    const handleDescChange = (event) => setDesc(event['target']['value']);

    const handleSubmit = (event) => {
        event.preventDefault();
        const partialNewDeck = {name: name, description: desc};
        const abortController = new AbortController();
        // let newDeckID;
        async function upload() {
            try {
                const response = await createDeck(partialNewDeck, abortController.signal);
                // console.log("CREATE DECK response: ", response);
                // newDeckID = parseInt(response['id']);
                // console.log("create deck RUN SECOND: ", newDeckID);
                history.push(`/decks/${parseInt(response['id'])}`);
            }
            catch(error) {
                console.log("ERROR: " + error); // <ErrorMessage error={error} />;
                return undefined;
            }
        }
        upload();
        // console.log("create deck RUN FIRST: ", newDeckID);
        // history.push(`/decks/${newDeckID}`);
        // history.push("/");
    };
    
    return(
        <div>
            <header>
                <NavLink to="/">Home</NavLink> / Create Deck
            </header>
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Enter name:
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleNameChange}
                        value={name}
                        placeholder="Deck Name"
                    />
                </label><br/>
                <label htmlFor="desc">
                    Description:
                    <textarea
                        id="desc"
                        name="desc"
                        onChange={handleDescChange}
                        value={desc}
                        placeholder="Brief description of the deck"
                    />
                </label><br/>
                <button type="submit">Submit</button>
                <button onClick={() => history.push("/")}>Cancel</button>
            </form>
      </div>
    );
}

export default CreateDeck;