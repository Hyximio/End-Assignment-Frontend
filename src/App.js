import './App.css';
import Header from "./components/header/Header";
import {Route, Switch} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import FindYourBeerPage from "./pages/FindYourBeer";
import LoginPage from "./pages/LoginPage";
import getAllData from "./helpers/getAllData";
import {useEffect, useState} from "react";

function App() {

    const [collectedAllData, setCollectedAllData] = useState( false );
    const [beerData, setBeerData] = useState( [] );

    useEffect( () => {
        if ( collectedAllData ) return;

        const controller = new AbortController();
        getAllData( setCollectedAllData, beerData, setBeerData, controller );

        return function cleanup() {
            controller.abort();
        }

    }, [])


  return (
    <div>
        <Header />
        <Switch>
            <Route exact path="/">
                <HomePage data={beerData} completed={collectedAllData}/>
            </Route>
            <Route path="/overview">
                <OverviewPage data={beerData}/>
            </Route>
            <Route path="/find-your-beer">
                <FindYourBeerPage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
