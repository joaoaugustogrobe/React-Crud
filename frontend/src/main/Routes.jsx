import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'



export default props => {
    let myProps = props

   

    return(
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/users' render={props => <UserCrud {...myProps} />}/>
        <Redirect from='*' to='/'/>
    </Switch>
    )
}
///  <Route path='/users' component={UserCrud}/>