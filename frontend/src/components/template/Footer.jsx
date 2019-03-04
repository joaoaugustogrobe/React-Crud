import './Footer.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props => {
    return(
    <React.Fragment>
        <footer className="footer">
            <span>
                Desenvolvido com por <strong>João Augusto Grobe Castilho</strong>,
                em curso <strong> Cod<span className="text-danger">3</span>r</strong>
            </span>
        </footer>
        <div className="logout">
            <Link to="/login" onClick={localStorage.removeItem("SessionToken")}>
                <span>Logout</span>
            </Link>
        </div>
    </React.Fragment>
    )
}
