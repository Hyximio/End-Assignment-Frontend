import React, {createContext, useRef, useState} from 'react';

export const BeerDataContext = createContext(null);

function BeerDataContextProvider( {children}){

    const [collectedAll, setCollectedAll] = useState( false );
    const [beerData, setBeerData] = useState( [] );
    const bufferData = useRef([]);

    const beerContext = {
        beerData,
        setBeerData,
        collectedAll,
        setCollectedAll,
        bufferData,
        sort: function( _sort ){

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

                default:console.log("No sort type supported: " + _sort)
            }
        }
    }

    return (
        <BeerDataContext.Provider value={beerContext}>
            {children}
        </BeerDataContext.Provider>
    )
}

export default BeerDataContextProvider;