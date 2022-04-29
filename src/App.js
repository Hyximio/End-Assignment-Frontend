import './App.css';
import Header from "./components/Header/Header";
import {Route, Switch} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import FindYourBeerPage from "./pages/FindYourBeer";
import LoginPage from "./pages/LoginPage";
import BeerFocus from "./pages/BeerFocus";
import {useContext, useEffect, useState} from "react";
import {BeerDataContext} from "./context/BeerDataContext";

function App() {

    // const beerDataContext = useContext( BeerDataContext );
    // const { beerData, collectedAll } = beerDataContext;
    //
    // useEffect( () => {
    //
    //     if ( collectedAll ) return;
    //
    //     const controller = new AbortController();
    //
    //     getAllData( beerDataContext, controller );
    //
    //     return function cleanup() {
    //         controller.abort();
    //     }
    //
    // }, []);

    const { beerData, collectedAll } = useContext( BeerDataContext );
  return (
    <div>
        <Header />
        <Switch>
            <Route exact path="/">
                <HomePage data={beerData} completed={collectedAll}/>
            </Route>
            <Route path="/overview">
                <OverviewPage />
            </Route>
            <Route path="/find-your-beer">
                <FindYourBeerPage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/beers/:id">
                <BeerFocus beer={beerData}/>
            </Route>
        </Switch>
    </div>
  );
}

export default App;
