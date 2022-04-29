import axios from 'axios';
import {useContext} from "react";
import {BeerDataContext} from "../context/BeerDataContext";
import cleanupBeerData from "./cleanupBeerData";

function getAllData( _beerDataContext, _abortCtrl ) {

    const { setCollectedAll, beerData, setBeerData } = _beerDataContext;

    async function fetchData() {

        try {
            let storage = [];
            let result;
            let page = Math.floor(beerData.length / 80);

            do {
                page++;

                result = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`, {
                    signal: _abortCtrl.signal
                });

                // Break loop if no more data can be collected
                if (result.data.length === 0) {

                    break;
                }

                // Add the data to the storage and combined data to the beerData
                storage = storage.concat( result.data );
                setBeerData( storage );
                console.log( storage );

            } while( result.data.length !== 0 )

            const cleanedBeerData = cleanupBeerData(storage);
            setBeerData( cleanedBeerData );
            setCollectedAll(true);

        } catch (e) {
            console.log(e);
        }

    }

    fetchData();

}

export default getAllData;