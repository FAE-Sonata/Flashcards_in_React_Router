import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import DeckList from "./Home/DeckList";
import CreateDeck from "./Home/CreateDeck";
import DeckView from "./Decks/DeckView";
import Study from "./Cards/Study";
import AddCard from "./Cards/AddCard";
import NotFound from "./NotFound";
import DeckEdit from "./Decks/DeckEdit";
import CardEdit from "./Cards/CardEdit";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <DeckList/>
          </Route>
          <Route path="/decks/new"> {/* pathing OK */ }
            <CreateDeck/>
          </Route>
          <Route exact={true} path="/decks/:deckId"> {/* pathing OK */ }
            <DeckView/>
          </Route>
          <Route path="/decks/:deckId/study"> {/* pathing OK */ }
            <Study/>
          </Route>
          {/* navigated to from Study or DeckView */ }
          <Route path="/decks/:deckId/cards/new"> {/* pathing OK */ }
            <AddCard/>
          </Route>
          <Route path="/decks/:deckId/edit"> {/* pathing OK */ }
            <DeckEdit/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit"> {/* pathing OK */ }
            <CardEdit/>
          </Route>
          <NotFound />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
