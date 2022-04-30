import React, {useContext} from 'react';
import './BeerItems.css';
import BearFeature from "../BeerFeature/BeerFeature";
import { Link } from 'react-router-dom';
import BeerColorSample from "../BeerColorSample/BeerColorSample";

function BeerItems( {beerData, setter} ) {


    const beerItems = beerData.map( (beer) =>

        <Link to={`/beers/${beer.id-1}`} onClick={setter ? () => setter(beer) : null} key={beer.name} className="beer-item" >
            <p className="beer-first-brewed">{beer.first_brewed}</p>
            <h1 className="beer-name">{beer.name}</h1>
            <h2 className="beer-tagline">{beer.tagline}</h2>
            <hr className="h-line"/>
            <div className="beer-details">
                <span className="tile-details">
                    <BearFeature typeName="Alcohol" value={beer.abv}/>
                    <BearFeature typeName="Bitterness" value={beer.ibu}/>
                    <BearFeature typeName="Acidity" value={beer.ph}/>
                </span>
                <BeerColorSample srm={beer.srm}/>
            </div>
        </Link>
    );

    return (
        <>
            {beerItems}
        </>
    )
}

export default BeerItems;