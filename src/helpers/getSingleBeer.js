import axios from 'axios';

// Doesn't seem to be necessary anymore to use this

function getSingleBeer( _id, _abortCtrl, _setter ) {



    async function fetchData() {

        try {
            const result = await axios.get(`https://api.punkapi.com/v2/beers/${_id}`, {
                signal: _abortCtrl.signal
            });;
            _setter( result.data[0] );

        } catch (e) {
            console.log(e);
        }
    }

    fetchData();

}

export default getSingleBeer;