import React from 'react';
import './OverviewPage.css';
import BearFeature from '../components/BeerFeature/BeerFeature';

function OverviewPage( {data} ) {

    const beerItems = data.map( (beer) =>
        <li key={beer.name} className="beer-item">
            <p className="beer-first-brewed">{beer.first_brewed}</p>
            <h1 className="beer-name">{beer.name}</h1>
            <h2 className="beer-tagline">{beer.tagline}</h2>
            <hr className="h-line"></hr>
            <span className="tile-details">
                <BearFeature typeName="Alcohol" value={beer.abv}/>
                <BearFeature typeName="Bitterness" value={beer.ibu}/>
                <BearFeature typeName="Acidity" value={beer.ph}/>
            </span>
        </li>
    );

    return (
        <>
            <div className="container">
                <ul className="beer-list">
                    {beerItems}
                </ul>
            </div>
        </>
    )
}

export default OverviewPage;