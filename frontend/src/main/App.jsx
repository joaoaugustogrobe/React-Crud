import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'
//      {HashRouter} faz a mesma navegação usando # 

import Routes from './Routes'
import Logo from '../components/template/Logo'
import Footer from '../components/template/Footer'
import Nav from '../components/template/Nav'
import Overlay from '../components/template/Overlay'


export default class App extends Component{
    initialState = {
        connection: "Connected",
        connectionDescription: "Connected",
        setConnection: this.setConnection.bind(this)
    }

    setConnection(connection, connectionDescription){
        this.setState({connection, connectionDescription})
    }
    state = this.initialState

    render(){
        console.log(this.state)
        return(
        <BrowserRouter>
            <div className="app">
                <Overlay {...this.state}/>
                <Logo />
                <Nav />
                <Routes {...this.state}/>
                <Footer />
            </div>
        </BrowserRouter>
        )
    }
}
