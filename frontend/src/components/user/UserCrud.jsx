import React, {Component} from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Create, Read, Update, Delete!'
}

export default class UserCrud extends Component{
    render(){
        return(
            <Main {...headerProps}>
                Usuário.    
            </Main>
        )
    }
}