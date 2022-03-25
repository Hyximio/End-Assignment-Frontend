import './App.css';
import Header from "./components/header/Header";
import {Route, Switch} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import FindYourBeerPage from "./pages/FindYourBeer";
import LoginPage from "./pages/LoginPage";
import getAllData from "./helpers/getAllData";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [collectedAllData, setCollectedAllData] = useState( false );
    const [beerData, setBeerData] = useState( [] );

    useEffect( () => {
        if ( collectedAllData ) return;

        const controller = new AbortController();

        async function fetchData() {

            try {
                let storage = [];
                let result;
                let page = Math.floor(beerData.length / 80);

                do {
                    page++;

                    result = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`, {
                        signal: controller.signal
                    });

                    // Break loop if no more data can be collected
                    if (result.data.length === 0) {
                        setCollectedAllData(true);
                        break;
                    }

                    // Add the data to the storage and combined data to the beerData
                    storage = storage.concat( result.data );
                    setBeerData( storage );

                } while( result.data.length !== 0 )

                // for (let page = leftOfPage; page < limitPages; page++) {
                //
                //     result = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`, {
                //         signal: controller.signal
                //     });
                //
                //     // Break loop if no more data can be collected
                //     if (result.data.length === 0) {
                //         setCollectedAllData(true);
                //         break;
                //     }
                //
                //     // Add the data to the storage and combined data to the beerData
                //     storage = storage.concat( result.data );
                //     setBeerData( storage );
                // }

            } catch (e) {
                console.log(e);
            }
        }

        fetchData();

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
                <OverviewPage />
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
