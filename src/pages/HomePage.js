import React from 'react';
import './HomePage.css';

function HomePage( {data, completed} ) {

    return (
        <>
            <p>Home page</p>
            <button type="button"
                    onClick={() => {
                        console.log( data );
                        console.log( completed);

                        let highestVal = data[0].ph;
                        let lowestVal = data[0].ph;
                        for (let i = 0; i < data.length; i++ ){
                            if (data[i].ph === null) continue;

                            if (data[i].ph > highestVal && data[i].ph < 79){
                                highestVal = data[i].ph;
                            }
                            if (data[i].ph < lowestVal){
                                lowestVal = data[i].ph;
                            }
                        }

                        console.log( lowestVal );
                        console.log( highestVal );
                    }}>Print data
            </button>
        </>
    )
}

export default HomePage;