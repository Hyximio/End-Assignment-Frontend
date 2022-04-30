
function cleanupBeerData( _beerData ) {

    // remove items with missing ph, srm or ibu data
    _beerData = _beerData.filter( beer => beer.ibu && beer.ph && beer.srm); //

    // cleanup given values
    for( let i = 0; i < _beerData.length; i++){

        // Because human tongue can't taste bitterness above 120
        if (_beerData[i].ibu > 120) _beerData[i].ibu = 120;

        // Mistakes in data in ph value where ph-value is 10 times too high
        if (_beerData[i].ph > 10)   _beerData[i].ph /= 10;

        // All srm values are 10 times to high
        _beerData[i].srm /= 10;
    }

    return _beerData;
}

export default cleanupBeerData;