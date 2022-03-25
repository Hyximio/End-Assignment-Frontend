import axios from 'axios';

function getAllData( _collection, _setter, _abortCtrl ) {

    async function fetchData() {

        try {

            const limitPages = 10;
            for (let page = 1; page < limitPages; page++) {

                await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`, {
                    signal: _abortCtrl.signal
                }).then(function (response) {

                    const mergedObject = Object.assign( _collection, response.data );
                    _setter(mergedObject);
                });
            }


            // controller.abort()

            // let result;
            // let allBeers = [];

            // if for any reason gets stuck it will break after 10 pages
            // const limitPages = 10;
            //
            // for (let page = 1; page < limitPages; page++) {
            //     result = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`);
            //
            //     if (result.data.length === 0) break;
            //     for (const beer of result.data) allBeers.push(beer);
            //     console.log( allBeers.length )
            //     console.log( page );
            // }
            //
            // console.log( allBeers );

            // _setter( allBeers );

        } catch (e) {
            console.log(e);
        }
    }

    fetchData();

}

export default getAllData;