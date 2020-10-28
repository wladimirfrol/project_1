import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = event => {
        auth.logout();
        history.push('/');
    }

    return (
        <nav>
            <div className="nav-wrapper red darken-4" style={{ padding: "0 1rem" }}>
            <span className="brand-logo">Сокращение ссылок</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create" >CREATE</NavLink></li>
                <li><NavLink to="/links">LINKS</NavLink></li>
                <li><span onClick={logoutHandler} >LOGOUT</span></li> {/** стили доделать */}
            </ul>
            </div>
        </nav>
    );
}