import React, {useContext, useEffect, useState} from 'react';
import './NoAccessPage.css';

function NoAccess() {

    return (
        <>
            <p className="no-access-message">You have to be logged in to get permission to see all the details of the beer. </p>
        </>
    )
}

export default NoAccess;