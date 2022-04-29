import React from 'react';
import './BeerFeature.css';
import minMaxValue from '../../helpers/minMaxValue';

function BeerFeature( {typeName, value} ) {

    const barWidth = minMaxValue( typeName, value );

    // Adding a '+' symbol if value is above 120
    if (typeName.toLowerCase() === "bitterness"){
        if (value === 120) value = "120+"
    }

    return (
        <>
            <div className="tile-details-row">
                <div className="graph-type">{typeName}</div>
                <div className="graph-box">
                    <div style={{width:barWidth}} className={`graph-box--bar ${typeName.toLowerCase()}`}> </div>
                </div>
                <div className="graph-value">{value}</div>
            </div>
        </>
    )
}

export default BeerFeature;