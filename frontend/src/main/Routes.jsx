import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import CrudTests from '../components/user/CrudTests'
import Login from '../components/login/Login'
import Register from '../components/register/Register'
import WithAuth from '../components/Util/WithAuth'



export default props => {
    let myProps = props
    let ProtectedTestsPage = WithAuth(CrudTests)

    //Outras formas de fazer o link
    //<Route exact path='/' component={Home}/>
    //<Route path='/users' render={props => <UserCrud {...myProps} />}/>
    return(
    <Switch>
        <Route path='/home' render={props => <Home {...myProps} />}/>

        
        <Route
            path='/users'
            render={
                (props) =>  <ProtectedTestsPage {...myProps}/>
            }
        />


        <Route exact path='/' render={props => <Home {...myProps} />}/>

        <Route path='/login' render={props => <Login {...myProps} />}/>
        <Route path='/register' render={props => <Register {...myProps} />}/>
        <Redirect from='*' to='/'/>
    </Switch>
    )
}
///  <Route path='/users' component={UserCrud}/>