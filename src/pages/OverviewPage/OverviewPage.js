import React, {useContext, useEffect, useRef, useState} from 'react';
import './OverviewPage.css';
import {BeerDataContext} from "../../context/BeerDataContext";
import getAllData from "../../helpers/getAllData";
import BeerItems from "../../components/BeerItems/BeerItems";
import {useForm} from "react-hook-form";

function OverviewPage() {

    console.log( "overviewpage loaded" );

    const beerDataContext = useContext( BeerDataContext );
    const { beerData, collectedAll } = beerDataContext;

    useEffect( () => {
        if ( collectedAll ) {
            console.log( "Data already collected");
            return;
        }

        const controller = new AbortController();
        getAllData( beerDataContext, controller );

        return function cleanup() { controller.abort() }

    }, []);


    const [sort, setSort] = useState('Name');
    const [foundData, setFoundData] = useState(beerData);
    const lastSearchTerm = useRef( "" )

    const {register, handleSubmit, reset} = useForm();

    function setFilteredData( _data ){

        reset();
        lastSearchTerm.current = _data.searchTerm;

        const resultData = beerData.filter((beer) => {
            if (_data.searchTerm === "") {
                return beer
            } else {
                if (beer.name.toLowerCase().includes(_data.searchTerm)) {
                    return beer
                }
            }
        });

        setFoundData( resultData );
    }

    return (
        <>
            <div className="filter-container">
                <label className="sort-container">
                    Sort by :
                    <select value={sort}
                            onChange={
                                (event) => {
                                    setSort( event.target.value );
                                    beerDataContext.sort( event.target.value );
                                    setFilteredData( {searchTerm: lastSearchTerm.current} );
                                }
                            }>
                        <option value="name">Name</option>
                        <option value="first_brewed">First brew date</option>
                        <option value="abv">Alcohol</option>
                        <option value="ph">Acidity</option>
                        <option value="ibu">Bitterness</option>
                        <option value="srm">Beer color</option>
                    </select>
                </label>

                <form onSubmit={handleSubmit(setFilteredData)}>
                    <input
                        className="search-field"
                        type="text"
                        placeholder="Type here..."
                        id="details-username"
                        {...register("searchTerm")}
                    />
                    <button
                        className="search-button"
                        type="submit">
                        Search
                    </button>
                    { lastSearchTerm.current && <button
                        className="search-button"
                        type="button"
                        onClick={() => {
                            lastSearchTerm.current = "";
                            setFoundData( beerData );
                        }}>
                        Reset
                    </button>}
                </form>
            </div>

            <div className="container">
                    { foundData.length !== 0 ?
                        <ul className="beer-list"> <BeerItems beerData={foundData}/> </ul> :
                        <p className="nothing-found">No beers found with this search term '{lastSearchTerm.current}'. Press RESET to show all beers.</p>
                    }
            </div>
        </>
    )
}

export default OverviewPage;