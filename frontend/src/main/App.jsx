import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'
//import jwt from 'jsonwebtoken'
//      {HashRouter} faz a mesma navegação usando # 

import Routes from './Routes'
import Logo from '../components/template/Logo'
import Footer from '../components/template/Footer'
import Nav from '../components/template/Nav'
import Overlay from '../components/template/Overlay'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export default class App extends Component{

    initialState = {
        connection: "Disconnected",
        connectionDescription: "Connecting...",
        setConnection: this.setConnection.bind(this),
        nextConnectionTry: 0
    }

    setConnection(connection, connectionDescription){
        this.setState({connection, connectionDescription})
    }
    state = this.initialState

    //Aqui faremos a conexão e testaremos o token
    async verifyConnection(){
        if(this.state.nextConnectionTry === 0){ 
            await axios(baseUrl).then(resp =>{
                this.props.setState( {connection:"Connected", connectionDescription:"Connected"})
                console.log("Conectado!")
                return true;
            }).catch(err=>{
                this.setState({nextConnectionTry: 10, connection:"Disconnected", connectionDescription:"Server offline"})
                console.log(err)
                
                return false;
            })
        }else
            this.setState( {nextConnectionTry: this.state.nextConnectionTry - 1} )
            return false;
    }
    componentDidMount(){
        //let token = localStorage.getItem('SessionToken')
        //const decoded = jwt.decode(token)
    }
    


    render(){
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
