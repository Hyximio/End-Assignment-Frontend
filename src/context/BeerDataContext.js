import React, {createContext, useState} from 'react';

export const BeerDataContext = createContext(null);

function BeerDataContextProvider( {children}){

    const [collectedAll, setCollectedAll] = useState( false );
    const [beerData, setBeerData] = useState( [] );

    const beerContext = {
        beerData:beerData,
        setBeerData:setBeerData,
        collectedAll:collectedAll,
        setCollectedAll:setCollectedAll,
        sort: function( _sort ){

            // Convert to existing object keys
            // _sort = _sort === "alcohol"    ? "abv" : _sort;
            // _sort = _sort === "acidity"    ? "ph"  : _sort;
            // _sort = _sort === "bitterness" ? "ibu" : _sort;
            // _sort = _sort === "beer color" ? "srm" : _sort;

            function dateToInt( _date ){
                const parts = _date.split("/");
                const strNumber = (parts.length > 1) ? parts[1] + parts[0] : parts[0] + "00";
                return parseInt( strNumber );
            }

            switch( _sort ){
                case "name":
                    this.setBeerData(
                        this.beerData.sort( (a, b) => a.name.localeCompare( b.name ) )
                    );
                    break;
                case "first_brewed":
                    this.setBeerData(
                        this.beerData.sort( (a, b) => dateToInt(a[_sort]) - dateToInt( b[_sort] ))
                    );
                    break;
                case "abv":
                case "ph":
                case "ibu":
                case "srm":
                    this.setBeerData( this.beerData.sort( (a, b) => a[_sort] - b[_sort] ) );
                    break;

                // Tmp to find longest name
                case "name length":
                    this.setBeerData( this.beerData.sort( (a, b) => a.name.length - b.name.length ) );
                    break;

                default:console.log("No sort type supported: " + _sort)
            }
            // this.beerData.map
        }
    }

    return (
        <BeerDataContext.Provider value={beerContext}>
            {children}
        </BeerDataContext.Provider>
    )
}

export default BeerDataContextProvider;