import React, {useContext, useState} from 'react';
import './FindYourBeer.css';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

function LoginPage( {} ) {

    const {register, formState:{errors}, handleSubmit, watch} = useForm( {
        mode:'onTouched'
    });

    function onFormLogin( _data ){

    }

    const [showByBeer, setShowByBeer] = useState(true);

    return (

        <div className="App">
            <div className="container-login">
                <div className="tabs">
                    <div className={!showByBeer ? "tab-inactive" : "tab-active"}
                         onClick={() => setShowByBeer(true)}
                    >
                        <p className="tab-text">By Beer</p>
                    </div>
                    <div className={showByBeer ? "tab-inactive" : "tab-active"}
                         onClick={() => setShowByBeer(false)}
                    >
                        <p className="tab-text">Advanced</p>
                    </div>
                </div>
                {showByBeer &&
                <div className="tabs-body">
                    <form onSubmit={handleSubmit(onFormLogin)}>

                        <fieldset className="input-fields">
                            <label htmlFor="details-username"
                                   className="input-label">
                                Find potential beer based upon this beer:


                            </label>
                            <label htmlFor="details-password"
                                   className="input-label">
                                Password:
                                <input
                                    className="fields"
                                    type="password"
                                    id="details-password"
                                    {...register("password", {
                                        required: "Password is not set",
                                    })}
                                />

                                {(errors.password || errors.username) && <p className="error">Account doesn't exist</p>}
                            </label>
                            <button
                                className="submit-button"
                                type="submit">
                                Login
                            </button>
                        </fieldset>
                    </form>
                </div>
                }
                {!showByBeer &&
                <p>advanced</p>
                }
            </div>
        </div>

    );
}

export default LoginPage;