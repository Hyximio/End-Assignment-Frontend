import axios from 'axios';

function getAllData( _setGotData, _data, _setData, _abortCtrl ) {

    async function fetchData() {

        try {
            let storage = [];
            let result;
            let page = Math.floor(_data.length / 80);

            do {
                page++;

                result = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`, {
                    signal: _abortCtrl.signal
                });

                // Break loop if no more data can be collected
                if (result.data.length === 0) {
                    _setGotData(true);
                    break;
                }

                // Add the data to the storage and combined data to the beerData
                storage = storage.concat( result.data );
                _setData( storage );

            } while( result.data.length !== 0 )

        } catch (e) {
            console.log(e);
        }
    }

    fetchData();

}

export default getAllData;