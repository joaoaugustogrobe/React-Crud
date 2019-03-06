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
import axios from 'axios'

const baseUrl = 'http://localhost:3001/'

export default class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            connection: "Disconnected",
            connectionDescription: "Connecting...",
            setConnection: this.setConnection.bind(this),
            nextConnectionTry: 0,
            authenticated: false
        }
    }
    setConnection(connection, connectionDescription){ //If connection is !== of Connected, overlay pop up (Check overlay component)
        this.setState({connection, connectionDescription})
    }

    componentDidMount(){
        let token = localStorage.getItem('SessionToken')
        var headers = {
            'Authorization': `bearer ${token}`
        }
        axios.post(`${baseUrl}auth`,'', {headers: headers} ).then(resp => {//pass token as header
            console.log(resp)
            this.setState( {connection:"Connected", connectionDescription:"Connected", authenticated: true} )//Connected AND authenticated
        }).catch(err => {
            console.log(err)
            if(err.response){
                if(err.response.status === 401){
                    console.log('a')
                    this.setState( {connection:"Connected", connectionDescription:"Connected", authenticated:false} )//Connected but not authenticated
                }else{
                    console.log('b')
                    this.setState({nextConnectionTry: 10, connection:"Disconnected", connectionDescription:"Server offline"})//not cnonnected
                }
            }else
            this.setState({nextConnectionTry: 10, connection:"Disconnected", connectionDescription:"Server offline"})//Server offline
        })
    }
    


    render(){
        return(
        <BrowserRouter>
            <div className="app">
                <Overlay {...this.state}/>
                <Logo />
                <Nav {...this.state}/>
                <Routes {...this.state}/>
                <Footer />
            </div>
        </BrowserRouter>
        )
    }
}
