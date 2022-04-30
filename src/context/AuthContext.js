import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import tokenIsValid from "../helpers/tokenIsExpired";

export const AuthContext = createContext(null);

function AuthContextProvider( {children}){

    const [auth, setAuth] = useState( {
        isAuth: false,
        user: null,
        status: "pending",
    })

    useEffect( () => {

        const token = localStorage.getItem('token');

        if ( token ) {

            if ( tokenIsValid( token, 30 ) ){ // in minutes
                console.log( "Token found and tries to resign" );
                fetchUserData( token );
            }else{
                console.log( "Token found but is expired" );
                setAuth( {
                    ...auth,
                    status:'done',
                })

                // token is expired, go to signIn screen
                history.push( '/signin');
            }

        }else{
            console.log( "No token found" );
            setAuth( {
                ...auth,
                status:'done',
            })
        }
    }, []);

    const history = useHistory();

    // API functions to BACKEND
    async function fetchUserData( _token ) {
        try{
            const response = await axios.get( "https://frontend-educational-backend.herokuapp.com/api/user",{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${_token}`,
                }
            });

            console.log( response );

            setAuth( {
                ...auth,
                isAuth: true,
                user: {
                    email: response.data.email,
                    username: response.data.username,
                },
                status: 'done',
            });

        }catch(e){
            console.error(e)

            switch( e.response.status ){
                case 500:
                    // specific responses
                    break

            }
            setAuth( {
                ...auth,
                status:'done',
            })
        }
    }

    async function signUp( _username, _email, _password ){
        console.log( "SignUp");
        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                "username": _username,
                "email": _email,
                "password": _password,
                "role": ["user"]
            });

            // Automatically signIn after signUp (because no e-mail verification)
            signIn( _username, _password );

        }catch(e){
            console.error(e)
            console.log( e.response );

            setAuth( {
                ...auth,
                status:'done',
            })
        }
    }

    async function signIn( _username, _password ){
        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                "username": _username,
                "password": _password,
            });

            // place token in the local storage
            localStorage.setItem( 'token', response.data.accessToken );

            setAuth( {
                ...auth,
                isAuth: true,
                user: {
                    email: response.data.email,
                    username: response.data.username,
                },
                status: 'done',
            });
            console.log( response );

            return response;
        }catch (e) {
            console.error(e);

            setAuth( {
                ...auth,
                status: 'done',
            });

            return e
        }
    }


    function login( _username, _password ){

        signIn( _username, _password );
        history.push( '/');
    }

    function logout() {
        setAuth( {
            ...auth,
            isAuth:false,
            user: null,
        });

        history.push( '/');
    }

    function register( _username, _email, _password ) {
        signUp( _username, _email, _password )

        history.push( '/');
    }

    // Populate the contextData for the AuthContext
    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        register,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;