import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCard({deckName, cardList, counterObj}) {
    const history = useHistory();
    const {count, setCounter} = counterObj;
    const incrementCounter = (x) => setCounter(x+1);

    const [isFront, setIsFront] = useState(true);
    const [hasFlipped, setHasFlipped] = useState(false); // refers to current card

    const handleFlip = (event) => {
        event.preventDefault();
        setHasFlipped(true); setIsFront(!isFront);
    };

    const handleNext = (event) => {
        event.preventDefault();
        if(count + 1 < cardList.length) {
            incrementCounter(count); setHasFlipped(false); setIsFront(true);
        }
        else {
            if(window.confirm("<p>Restart cards?</p><p>Click 'cancel' to return " +
                "to the home page.</p>")) {
                    setCounter(0); setHasFlipped(false); setIsFront(true);
            }
            else history.push("/");
        }
    }

    return (
        <div>
            {/* <header>
                <NavLink to="/">Home</NavLink> / {deckName} / Study
            </header> */}
            <div className="border p-4 h-100 d-flex flex-column">
                <h3>
                    Card {count+1} of {cardList.length}
                </h3>
                <p>
                    {(isFront) ? (cardList[count]['front']) : (
                        cardList[count]['back'])}
                </p>
                <ul>
                    <li>
                        <button onClick={handleFlip}>Flip</button>
                    </li>
                    {(hasFlipped) ? (
                        <li>
                            <button onClick={handleNext}>Next</button>
                        </li>
                    ) : ("")}
                </ul>
            </div>
        </div>
    );
}

export default StudyCard;