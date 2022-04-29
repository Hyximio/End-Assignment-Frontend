import React, {useContext, useEffect, useState} from 'react';
import './OverviewPage.css';
import BearFeature from '../components/BeerFeature/BeerFeature';
import {BeerDataContext} from "../context/BeerDataContext";
import getAllData from "../helpers/getAllData";
import BeerItems from "../components/BeerItems/BeerItems";

function OverviewPage() {

    console.log( "overviewpage loaded" );

    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        if (window.pageYOffset > 0 && !scrolled ){
            setScrolled( true );
        }else{
            setScrolled( false );
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: false });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [] );

    const beerDataContext = useContext( BeerDataContext );
    const { collectedAll } = beerDataContext;

    useEffect( () => {
        if ( collectedAll ) {
            console.log( "Data already collected");
            return;
        }

        const controller = new AbortController();
        getAllData( beerDataContext, controller );

        return function cleanup() { controller.abort() }

    }, []);


    const [sort, setSort] = React.useState('Name');

    return (
        <>
            {scrolled ? <p>scrolled</p> : <p>no scrolled</p>}
            <label>
                Sort
                <select value={sort}
                        onChange={
                            (event) => {
                                setSort( event.target.value );
                                beerDataContext.sort( event.target.value.toLowerCase() );
                            }
                        }>
                    <option value="Name">Name</option>
                    <option value="First brew date">First brew date</option>
                    <option value="abv">Alcohol</option>
                    <option value="ph">Acidity</option>
                    <option value="ibu">Bitterness</option>
                    <option value="srm">Beer color</option>
                    <option value="name length">Name Length</option>
                </select>
            </label>
            <div className="container">
                <BeerItems/>
            </div>
        </>
    )
}

export default OverviewPage;