import React, {useContext} from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import srmReferenceCard from "../../assets/srm_reference_card.png"

function Header() {

    const authContext = useContext( AuthContext );

    return (
        <>
            <img id="refCard" src={srmReferenceCard} alt="srm ref card" style={{visibility: "hidden", position: "absolute"}}/>
            <nav className="header-bar">
                <div className="nav-container">
                    <h1 className="header-title">BREWDOG</h1>
                    <ul>
                        <li>
                            <NavLink to="/" exact className="link" activeClassName="active-link">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/overview" className="link" activeClassName="active-link">Overview</NavLink>
                        </li>
                        <li>
                            {authContext.isAuth ?
                                <p className="link" onClick={authContext.logout}>Logout</p>
                                :
                                <NavLink to="/login" className="link" activeClassName="active-link">Login</NavLink>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header;