import React, {useContext, useEffect, useState} from 'react';
import './BeerFocus.css';
import { useParams } from "react-router-dom";
import {BeerDataContext} from "../context/BeerDataContext";
import getSingleBeer from "../helpers/getSingleBeer";
import glassBeer from '../assets/Beer_GreyedOut.png';
import getBeerColor from "../helpers/getBeerColor";
import {useHistory} from "react-router-dom";
import BeerItems from "../components/BeerItems/BeerItems";
// import srmReferenceCard from './assets/srm_reference_card.png';

function BeerFocus( {beer} ) {

    const { id } = useParams();
    const { beerData, collectedAll } = useContext( BeerDataContext );
    const [targetBeer, setTargetBeer] = useState( null );

    const history = useHistory();

    useEffect( () => {

        const controller = new AbortController();

        if ( collectedAll ){
            const idBeer = beerData.find( (beer) => (beer.id - 1).toString() === id);
            setTargetBeer( idBeer );
        }else {
            getSingleBeer( id, controller, setTargetBeer );
        }

        return function cleanup() { controller.abort() }

    }, []);


    let meals
    if (targetBeer) {
        meals = targetBeer.food_pairing.map((meal) => <li key={meal}>{meal}</li>);
        console.log( targetBeer );
    }

    return (
        !targetBeer ? <p>No beer found with this ID</p> : (
        <>
            <div className="container-beer">
                <section className="beer-summery">
                    <div className="beer-header">
                        <h1 className="beer-title">{targetBeer.name}</h1>
                        <span className="button-close" onClick={history.goBack}/>
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
                            {/*<button className="button-drunk">*/}
                            {/*I drunk this beer!*/}
                            {/*</button>*/}
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
            <div >
                <h3 className="container-beer">6 other beers you may also like:</h3>
                <BeerItems targetBeer={targetBeer} />
             </div>
        </>
        )
    )
}

export default BeerFocus;