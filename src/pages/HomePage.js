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
                    }}>Print data
            </button>
        </>
    )
}

export default HomePage;