import axios from 'axios';
import { XORShift } from 'random-seedable';

function getSingleBeer( _id, _abortCtrl, _setter ) {



    async function fetchData() {

        try {
            const result = await axios.get(`https://api.punkapi.com/v2/beers/${_id}`, {
                signal: _abortCtrl.signal
            });
            // console.log( result.data[0] );
            _setter( result.data[0] );
            // return result.data[0];
        } catch (e) {
            console.log(e);
            // return null;
        }
    }

    fetchData();

}

export default getSingleBeer;