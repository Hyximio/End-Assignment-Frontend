import React, {useContext, useEffect, useRef, useState} from 'react';
import './HomePage.css';
import {BeerDataContext} from "../../context/BeerDataContext";
import getAllData from "../../helpers/getAllData";
import BeerItems from "../../components/BeerItems/BeerItems";
import {AuthContext} from "../../context/AuthContext";
import getRandomQuote from "../../helpers/getRandomQuote";
import getDailyBeer from "../../helpers/getDailyBeer";

function HomePage() {
    const {isAuth, user} = useContext( AuthContext );
    const beerDataContext = useContext( BeerDataContext );
    const { beerData, collectedAll } = beerDataContext;
    const [ dailyBeer, setDailyBeer ] = useState(null);
    const randomQuote = useRef( getRandomQuote() );

    useEffect( () => {
        if ( collectedAll ) {
            console.log( "Data already collected");
            return;
        }

        const controller = new AbortController();
        getAllData( beerDataContext, controller );

        return function cleanup() { controller.abort() }

    }, []);

    useEffect( () => {
        setDailyBeer( getDailyBeer( beerData ) );
    }, [beerData]);

    return (
        <>
            <div className="header-quote-bar">
                {randomQuote &&
                <div className="header-quote">{randomQuote.current}</div>
                }
            </div>
            <div className="white-container" >
                {isAuth && <><p>Hi {user.username}!</p><br/></>}
                <p className="">Welcome on this Brewdog beer page. Here you can search for a beer you like among 300+ choices! <br/><br/>
                Just take a look and enjoy every sip of your favorite beer!</p>

            </div>
            {dailyBeer &&
            <div className="beer-of-the-day">
                <h2 className="beer-of-the-day--title">This is the beer of the day:</h2>
                <div>
                    <BeerItems beerData={[dailyBeer]}/>
                </div>
            </div>
            }

        </>
    )
}

export default HomePage;