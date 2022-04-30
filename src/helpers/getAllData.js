import axios from 'axios';
import cleanupBeerData from "./cleanupBeerData";

function getAllData( _beerDataContext, _abortCtrl ) {

    const { setCollectedAll, beerData, setBeerData, bufferData } = _beerDataContext;

    async function fetchData() {

        try {
            let result;
            let page = Math.floor(beerData.length / 80);

            do {
                page++;

                result = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`, {
                    signal: _abortCtrl.signal
                });

                // Break loop if no more data can be collected
                if (result.data.length === 0) break;

                // Add the data to the storage and combined data to the beerData
                bufferData.current = bufferData.current.concat( result.data );


            } while( result.data.length !== 0 )

            // Cleanup the collected data
            const cleanedBeerData = cleanupBeerData(bufferData.current);

            // Transfer the data to the beerData state and it will refresh the page
            setBeerData( cleanedBeerData );

            // Empty REF object
            bufferData.current = [];

            // Set the value to true so it doesn't collect it on other sites anymore
            setCollectedAll(true);

        } catch (e) {
            console.log(e);
        }

    }

    fetchData();

}

export default getAllData;