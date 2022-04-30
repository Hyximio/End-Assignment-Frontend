import React, {useContext} from 'react';
import { Redirect, Route} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import NoAccessPage from "../../pages/NoAccessPage/NoAccessPage";

function PrivateRoute( {children, ...rest} ) {

    const {isAuth} = useContext( AuthContext );

    return (
        <Route {...rest}>
            { isAuth ? children : <NoAccessPage/> }
        </Route>

    )
}

export default PrivateRoute;