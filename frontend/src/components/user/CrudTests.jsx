import React, {Component} from 'react'
import Main from '../template/Main'
import axios from 'axios'
import Form from '../Util/Form'
import './CrudTests.css'

const headerProps = {
    icon: 'tasks',
    title: 'Testes',
    subtitle: 'Painel de testes'
}

const baseUrl = 'http://localhost:3001/persons'
const initialState = {
    connected : false,
    nextConnectionTry: 0,
    user: {Name:'', Description:'', ID_User:0},
    list: []
}


export default class UserCrud extends Component{
    state = {...initialState}

    
    componentWillMount(){
        //Ainda sera necessario fazer a conexão quando o componente for montado, solicitando a lista de usuarios
        //this.props.setConnection("Disconnected", "Connecting...") //Loading while not connected
        this.verifyConnection() //Verify connection
        console.log(this.props)
    }
    async verifyConnection(){
        //console.log(this.state.nextConnectionTry)
        if(this.state.nextConnectionTry === 0){
            //this.props.setConnection("Disconnected", "Connecting...")
            await axios(baseUrl).then(resp =>{
                //console.log("!")
                this.setState({connected: true,list: resp.data})
                //this.props.setConnection("Connected", "Connected")
                return true;
            }).catch(err=>{
                this.setState({connected: false, list: []})
                console.log(err)
                this.props.setConnection("Disconnected", "Server offline.")
                setTimeout(() => this.verifyConnection(), 10000)// after 10s retry connection
                return false;
            })
        }else
            //this.setState( {nextConnectionTry: this.state.nextConnectionTry - 1} )
            this.setState( {nextConnectionTry: 10} )
            return false;
    }
    

    clear(){
        this.setState({user: initialState.user})
    }


    async save(){
        await this.verifyConnection()
        if(!this.state.connected) return

        const nameForm = document.getElementById("nameForm")
        const emailForm = document.getElementById("emailForm")
        if(nameForm.value === ''){
            nameForm.classList.add("error")
            nameForm.addEventListener("click", () => nameForm.classList.remove("error"))
            return}
        if(emailForm.value === ''){
            emailForm.classList.add("error")
            emailForm.addEventListener("click", () => emailForm.classList.remove("error"))
            return}

        const user = this.state.user
        const method = user.ID_User ? 'put' : 'post'
        //similar a axios.blablabla, porém precios usar notação com [] pois temos uma string após o "ponto"
        axios[method](baseUrl, user).then(resp => {
            const list = this.getUpdatedList(resp.data)

            this.setState({user:initialState.user, list})
        }).catch(e=>{
            console.log(e)
        })
    }
    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.ID_User !== user.ID_User)
        if(add)
                list.unshift(user)

        return list
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" id='nameForm'
                            name="Name" value={this.state.user.Name}
                            onChange={e=>this.updateField(e)}
                            placeholder="Digite o nome aqui..."/>
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" id='emailForm'
                            name="Description" value={this.state.user.Description}
                            onChange={e=>this.updateField(e)}
                            placeholder="Digite o e-mail aqui..."/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-secundary" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                        <button className="btn btn-primary  ml-2" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({user})
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.ID_User}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({list})
        })
    }
    renderTable(){
        return(
            <table className="table md-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    renderRows(){
        return this.state.list.map(user=>{
            return(
                <tr key={user.ID_User}>
                    <td>{user.ID_User}</td>
                    <td>{user.Name}</td>
                    <td>{user.Description}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    //requisição GET com a API, se der sucesso ele troca o estado da aplicação para conectado

    render(){
        return(
        <Main {...headerProps}>
            {this.renderForm()}
            {this.renderTable()}
        </Main>
        )
    }
}