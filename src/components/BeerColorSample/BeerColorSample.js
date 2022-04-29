import React from 'react';
import './BeerColorSample.css';
import getBeerColor from "../../helpers/getBeerColor";

function BeerColorSample( {srm} ) {

    // console.log( srm);
    // console.log( getBeerColor( srm) );
    //style={{backgroundColor: getBeerColor(_srm) }}
    return (
        <>
            <div className="beer-color-sample" style={{backgroundColor: getBeerColor(srm) }}>

            </div>
        </>
    )
}

export default BeerColorSample;