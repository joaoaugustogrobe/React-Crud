import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'

import Logo from '../components/template/Logo'
import Footer from '../components/template/Footer'
import Nav from '../components/template/Nav'
import Main from '../components/template/Main'

export default props => 
    <div className="app">
        <Logo />
        <Nav />
        <Main icon="home" title="Início" subtitle="Menu inicial."/>
        <Footer />
    </div>
