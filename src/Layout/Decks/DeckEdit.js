import React, { useEffect, useState } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";

export const DeckEdit = () => {
    const history = useHistory();
    const params = useParams();
    const deckId = params['deckId'];
    
    const [thisDeck, setThisDeck] = useState({});
    // const [error, setError] = useState(undefined);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const handleNameChange = (event) => setName(event['target']['value']);
    const handleDescChange = (event) => setDesc(event['target']['value']);
    useEffect(() => {
        setThisDeck({}); setName(""); setDesc("");
        const abortController = new AbortController();
        async function loadText() {
            try {
                let response = await readDeck(deckId, abortController.signal);
                setThisDeck(response);
                setName(response['name']); setDesc(response['description']);
            }
            catch(error)    {
                return "ERROR " + error; // <ErrorMessage error={error} />;
            }
        }
        loadText();
        return (() => { abortController.abort() });
    }, [deckId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const modifiedDeck = {...thisDeck, ['name']: name, ['description']: desc};
        // produces warning, but /decks/:deckId will not immediately display new name upon Submit
        // console.log("MODIFIED DECK IN DECK EDIT: ", modifiedDeck);
        const abortController = new AbortController();
        try {
            updateDeck(modifiedDeck, abortController.signal);
        }
        catch(error) {
            console.log("ERROR: " + error); // <ErrorMessage error={error} />;
        }
        history.goBack();
        // useEffect(() => {
        //     const abortController = new AbortController();
        //     async function saveModification() {
        //         try {
        //             let response = await updateDeck(deckId, abortController.signal);
        //         }
        //         catch(error)    {
        //             return "ERROR " + error; // <ErrorMessage error={error} />;
        //         }
        //     }
        //     saveModification();
        //     return (() => { abortController.abort() });
        // }, []);
    };
    
    return(
        <div>
            <header>
                <NavLink to="/">Home</NavLink> / {thisDeck['name']} / Edit Deck
            </header>
            <div className="border p-4 h-100 d-flex flex-row">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Enter name:
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={handleNameChange}
                            value={name}
                        />
                    </label><br/>
                    <label htmlFor="desc">
                        Description:
                        <textarea
                            id="desc"
                            name="desc"
                            onChange={handleDescChange}
                            value={desc}
                        />
                    </label><br/>
                    <button type="submit">Submit</button>
                    <button onClick={() => history.goBack()}>Cancel</button>
                </form>
            </div>
      </div>
    );
}

export default DeckEdit;