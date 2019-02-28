import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import Login from '../components/login/Login'
import Register from '../components/register/Register'



export default props => {
    let myProps = props

   
    //<Route exact path='/' component={Home}/>
    return(
    <Switch>
        
        <Route exact path='/home' render={props => <Home {...myProps} />}/>
        <Route path='/users' render={props => <UserCrud {...myProps} />}/>
        <Route path='/login' render={props => <Login {...myProps} />}/>
        <Route path='/register' render={props => <Register {...myProps} />}/>
        <Redirect from='*' to='/'/>
    </Switch>
    )
}
///  <Route path='/users' component={UserCrud}/>