import './Footer.css'
import React from 'react'

export default props => {

    return(
    <React.Fragment>
        <footer className="footer">
            <span>
                Desenvolvido com por <strong>João Augusto Grobe Castilho</strong> e
                <strong> Wesley Campos da Silva.</strong>.
            </span>
        </footer>
        <Logout/>
    </React.Fragment>
    )
}
function Logout(){
    let Logout
    if(localStorage.getItem('SessionToken'))
        Logout =
            <div className="logout">
                <a href="/login" onClick={() => localStorage.removeItem("SessionToken")}> 
                    {/* dont use <Link to...>, </a> force page reload, and it's exact what we need to force the auth try again*/}
                    <span>Logout</span>
                </a>
            </div>
    else
        Logout = <div className="logout"></div>
    return(Logout)
}
