import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
//      {HashRouter} faz a mesma navegação usando # 

import Routes from './Routes'
import Logo from '../components/template/Logo'
import Footer from '../components/template/Footer'
import Nav from '../components/template/Nav'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes/>
            <Footer />
        </div>
    </BrowserRouter>

