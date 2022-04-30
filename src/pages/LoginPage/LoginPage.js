import React, {useContext, useState} from 'react';
import './LoginPage.css';
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import TermsOfAgreement from "../../components/TermsOfAgreement/TermsOfAgreement";

function LoginPage( {} ) {

    const authContext = useContext( AuthContext );

    const {register, formState:{errors}, handleSubmit, watch} = useForm( {
        mode:'onTouched'
    });

    function onFormRegister( _data ){

        authContext.register( _data.username, _data.email, _data.password);
        console.log( authContext );
    }

    function onFormLogin( _data ){

        authContext.login( _data.username, _data.password);
        console.log( authContext );
    }

    // watch the password so it can check if it's the same
    const password = watch('password');
    const [showLogin, setShowLogin] = useState("Login");
    const [conditions, setConditions] = useState(false);

    return (

        <div className="App">
            <div className="container-login">
                <div className="tabs">
                    <div className={showLogin === "Register" ? "tab-inactive" : "tab-active"}
                         onClick={() => setShowLogin("Login")}
                         style={{visibility: showLogin !== "Terms" ? "visible" : "hidden"}}
                    >
                        <p className="tab-text">Login</p>
                    </div>
                    <div className={showLogin === "Login" ? "tab-inactive" : "tab-active"}
                         onClick={() => setShowLogin("Register")}
                         style={{visibility: showLogin !== "Terms" ? "visible" : "hidden"}}
                    >
                        <p className="tab-text">Register</p>
                    </div>
                </div>
                {showLogin === "Login" &&
                <div className="tabs-body">
                    <form onSubmit={handleSubmit(onFormLogin)}>

                        <fieldset className="input-fields">
                            <label htmlFor="details-username"
                                   className="input-label">
                                Username:
                                <input
                                    className="fields"
                                    type="text"
                                    id="details-username"
                                    {...register("username", {
                                        required: "Username must be filled in",
                                    })}
                                />

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
                {showLogin === "Register" &&
                <div className="tabs-body">
                    <form onSubmit={handleSubmit(onFormRegister)}>

                        <div className="input-fields">
                            <label htmlFor="details-username"
                                   className="input-label">
                                Username:
                                <input
                                    className="fields"
                                    type="text"
                                    id="details-username"
                                    {...register("username", {
                                        required:"Username must be filled in",
                                        minLength:{
                                            value:6,
                                            message:"Username must be longer than 5 chars"
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9_\-.]{6,}$/i,
                                            message: "No special chars are aloud"
                                        }
                                    })}
                                />
                                {errors.username && <p className="error">{errors.username.message}</p>}
                            </label>
                            <label htmlFor="details-email"
                                   className="input-label">
                                E-mail:
                                <input
                                    className="fields"
                                    type="text"
                                    id="details-email"
                                    {...register("email", {
                                        required:"E-mail must be filled in",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid e-mail address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="error">{errors.email.message}</p>}
                            </label>
                            <label htmlFor="details-password"
                                   className="input-label">
                                Password:
                                <input
                                    className="fields"
                                    type="password"
                                    id="details-password"
                                    {...register("password", {
                                        required:"Password is not set",
                                        minLength:{
                                            value:6,
                                            message:"Must be longer than 5 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#~])[A-Za-z\d@$!%*?&#~]+$/gi,
                                            message: "Need capital- special char and number"
                                        }
                                    })}
                                />

                                {errors.password && <p className="error">{errors.password.message}</p>}
                            </label>
                            <label htmlFor="details-confirmPassword"
                                   className="input-label">
                                Confirm Password:
                                <input
                                    className="fields"
                                    type="password"
                                    id="details-confirmPassword"
                                    onPaste={(e) =>{
                                        e.preventDefault()
                                        return false;
                                    }}
                                    {...register("confirmPassword", {
                                        required:true,
                                        validate:(value) => value === password || "The password do not match",
                                    })}
                                />

                                {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                            </label>
                            <div className="flex-row">
                                <label htmlFor="accept-conditions"
                                       className="agreement">
                                    <input
                                        className="agreement-text"
                                        type="checkbox"
                                        onClick={() => setConditions( !conditions )}
                                    />I accept the</label>
                                    <p
                                    className="agreement-link"
                                    onClick={() => setShowLogin("Terms")}>terms of agreement</p>
                            </div>
                            <button
                                className="submit-button"
                                type="submit"
                                disabled={!conditions}>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
                }
                {showLogin === "Terms" &&
                <div className="tabs-body tabs-body-rounded" style={{wordWrap: "break-word"}}>
                    <h3 className="tab-text agreement-header">Terms of agreement</h3>
                    <TermsOfAgreement/>
                    <button className="submit-button"
                    onClick={() => setShowLogin("Register")}>Close</button>
                </div>
                }

            </div>
        </div>

    );
}

export default LoginPage;