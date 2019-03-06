import React from 'react'
import Main from '../template/Main'

export default props =>{
    if(props.connection !== "Connected") props.setConnection("Connected", "not required")
    
    return(
    <Main icon="home" title="Início" subtitle="Menu inicial.">
    <div className='display-4'>Bem Vindo!</div>
    <hr />
    <p className="mb-0">Aqui são exibidos os ultimos envios das atividades.</p>

    </Main>)}