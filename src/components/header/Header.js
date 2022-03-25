import React from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";

function Header( {} ) {

    return (
        <>
            <nav>
                <div className="nav-container">
                    <h1>BREWDOG</h1>
                    <ul>
                        <li>
                            <NavLink to="/" exact className="link" activeClassName="active-link">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/overview" className="link" activeClassName="active-link">Overview</NavLink>
                        </li>
                        <li>
                            <NavLink to="/find-your-beer" className="link" activeClassName="active-link">Find your beer!</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="link" activeClassName="active-link">Login</NavLink>
                        </li>
                    </ul>
                    {/*<img src="./assets/hamburger.svg" alt="website logo" id="hamburger-menu"/>*/}
                </div>
            </nav>
        </>
    )
}

export default Header;