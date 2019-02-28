import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
export default props => {
    return(
    <aside className="menu-area">
        <nav className="menu">
            {/* Nav-item jsx   Refatorar !? */}
            <Link to="/login">
                <i className="fa fa-sign-in"></i>  Login
            </Link>
            <Link to="/register">
                <i className="fa fa-sign-in"></i>  Registrar
            </Link>
            <Link to="/">
                <i className="fa fa-home"></i>  Início
            </Link>
            <Link to="/users">
                <i className="fa fa-users"></i>  Usuários
            </Link>
        </nav>
    </aside>
    )
}