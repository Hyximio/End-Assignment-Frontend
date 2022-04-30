import React, {useContext, useEffect, useState} from 'react';
import './BeerFocusPage.css';
import {Link, useParams} from "react-router-dom";
import {BeerDataContext} from "../../context/BeerDataContext";
import glassBeer from '../../assets/Beer_GreyedOut.png';
import getBeerColor from "../../helpers/getBeerColor";
import {useHistory} from "react-router-dom";
import BeerItems from "../../components/BeerItems/BeerItems";
import {getPotentialBeerByBeer} from "../../helpers/getPotentialBeer";
import getAllData from "../../helpers/getAllData";


function BeerFocusPage() {

    const { id } = useParams();
    const [targetBeer, setTargetBeer] = useState( null );

    const beerDataContext = useContext( BeerDataContext );
    const { beerData, collectedAll } = beerDataContext;

    useEffect( () => {

        if ( collectedAll ) {

            const idBeer = beerData.find( (beer) => (beer.id - 1).toString() === id);
            setTargetBeer( idBeer );

            console.log( "Data already collected");
            return;
        }

        const controller = new AbortController();
        getAllData( beerDataContext, controller );


        return function cleanup() { controller.abort() }

    }, []);


    let meals
    let potentialBeers = []

    if (targetBeer) {
        meals = targetBeer.food_pairing.map((meal) => <li key={meal}>{meal}</li>);

        const potentialBeersList = getPotentialBeerByBeer( beerData, targetBeer);

        for( let i = 1; i < 7; i++){
            potentialBeers.push( potentialBeersList[i])
        }
    }

    return (
        !targetBeer ? <p>No beer found with this ID</p> : (
        <>
            <div className="container-beer">
                <section className="beer-summery">
                    <div className="beer-header">
                        <h1 className="beer-title">{targetBeer.name}</h1>
                        <Link to="/overview" className="button-close" />
                    </div>
                    <div className="beer-body">
                        <div>
                            <h2 className="beer-tag">{targetBeer.tagline}</h2>
                            <h3 className="beer-description">{targetBeer.description}</h3>

                            <div className="beer-details-container">
                                <div className="beer-details-type">
                                    <p>Alcohol</p>
                                    <p>Bitterness</p>
                                    <p>Acidity</p>
                                    <p>Birth-date</p>
                                </div>
                                <div className="beer-details-values">
                                    <p>{targetBeer.abv}%</p>
                                    <p>{targetBeer.ibu}</p>
                                    <p>{targetBeer.ph}</p>
                                    <p>{targetBeer.first_brewed}</p>
                                </div>
                            </div>
                            <h4 className="meal-title">Delicous with</h4>
                            <ul className="meals">
                                {meals}
                            </ul>
                        </div>
                        <div className="beer-column">

                            <div className="beer-image-container">
                                <img className="beer-img" src={glassBeer} alt="beer img"/>
                                <div style={{backgroundColor:getBeerColor( targetBeer.srm )}} className="beer-color">.</div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
            <div className="potential-container potential-list">
                <h3 className="potential-header">Other beers that are similar:</h3>
                {potentialBeers && <BeerItems beerData={potentialBeers} setter={setTargetBeer}/> }
             </div>
        </>
        )
    )
}

export default BeerFocusPage;