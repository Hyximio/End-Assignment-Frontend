
function getBeerDifValue( _beer, _abv, _ph, _ibu ){
    let {abv, ph, ibu} = _beer;

    let difValue = Math.abs(abv - _abv);
    difValue += Math.abs(ph - _ph);
    difValue += Math.abs(ibu - _ibu);

    return difValue;
}

function getPotentialBeer( _beerData, _abv, _ph, _ibu ){

    // loop through all beers and potential value
    for( let i=0; i < _beerData.length; i++) {
        _beerData[i] = {
            ..._beerData[i],
            potentialValue: getBeerDifValue(_beerData[i], _abv, _ph, _ibu)
        }
    }

    _beerData.sort( (a,b) => a.potentialValue - b.potentialValue)

    return _beerData;
}

function getPotentialBeerByBeer( _beerData, _beer ) {
    // Remove current beer
    const limitData = _beerData.filter( beer => beer.id !== _beer.id );
    const {abv, ph, ibu} = _beer;

    const sortedBeer = getPotentialBeer( limitData, abv, ph, ibu );
    sortedBeer.unshift( _beer );

    return sortedBeer;
}

// function getSimilarBeers( _beerData, _beer ){
//
//     const {abv, ph, ibu} = _beer;
//     let targetDifValue = getBeerDifValue( _beerData[0], _abv, _ph, _ibu );
//
//     for( let i=1; i < _beerData.length; i++) {
//
//     }
// }

export {getPotentialBeer, getPotentialBeerByBeer};
