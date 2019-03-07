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
    testForm: {name:'',Name:false, description:'',Description:false, args:'', Args:false},//args: f(x)... valid args: true or false (form validation)
    list: [],
    argList: []
}


export default class CrudTest extends Component{
    state = {...initialState}

    
    componentWillMount(){
        this.verifyConnection()
        console.log(this.props)
    }

    async verifyConnection(){
        await axios(baseUrl).then(resp =>{
            this.setState({connected: true,list: resp.data})
            return true;
        }).catch(err=>{
            this.setState({connected: false, list: []})
            console.log(err)
            this.props.setConnection("Disconnected", "Server offline.")
            return false;
       })
    }    

    clear(){ //clear form
        this.setState({testForm: initialState.testForm})
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

        const testForm = this.state.testForm
        const method = testForm.ID_testForm ? 'put' : 'post'
        //similar a axios.blablabla, porém precios usar notação com [] pois temos uma string após o "ponto"
        axios[method](baseUrl, testForm).then(resp => {
            const list = this.getUpdatedList(resp.data)

            this.setState({testForm:initialState.testForm, list})
        }).catch(e=>{
            console.log(e)
        })
    }
    getUpdatedList(testForm, add = true){
        const list = this.state.list.filter(u => u.ID_testForm !== testForm.ID_testForm)
        if(add)
                list.unshift(testForm)

        return list
    }

    updateField(event){
        const testForm = {...this.state.testForm}
        testForm[event.target.name] = event.target.value
        this.setState({testForm})
    }


    nameValidation = {
        text:"name",
        textHelper:"*Obrigatorio",
        placeholder:"Newton",
        setFormValid: this.setFormValid.bind(this),
        validation: [{
            validationType:"length",
            args:{ min:5, max:127 },
            textWhenInvalid:"O nome do teste deve conter no minimo 5 caracters"}
        ]
    }
    descriptionValidation = {
        text:"Descrição",
        textHelper:"",
        placeholder:"Correção da primeira atividade computacional",
        setFormValid: this.setFormValid.bind(this),
        validation: [{
            validationType:"length",
            args:{ min:undefined, max:127 },
            textWhenInvalid:"A descrição esta muito longa."}
        ]
    }

    argsValidation = {
        text:"args",
        textHelper:"",
        placeholder:["@(x) exp(-x^2) - cos(x)", "@(x) x^2 + 2*x - 50", "@(x) 2*x + 2", "[1 2 1; 2 -3 -1; 3 -1 -2]", "1"][Math.floor(Math.random()*5)],
        setFormValid: this.setFormValid.bind(this),
        validation: [{
            validationType:"length",
            args:{ min:undefined, max:127 },
            textWhenInvalid:"O argumento esta muito longo."}
        ]
    }

    setFormValid(form, value){
        switch(form){
            case 'Name' : this.setState({ Name:value  }); break
            case 'Password' : this.setState({Password:value}); break
            case 'username' : this.setState({username:value}); break
            case 'password' : this.setState({password:value}); break
            default: this.setState( { [form]:value } )
        }
        //this.setstate( {this.state[form]:value} )
    }
    addArg(e){
        if(this.state.args === null) return
        let argList = this.state.argList
        argList.push(this.state.args)
        this.setState({argList: argList, args:null, Args:false})
        e.target.value = ''
        this.functionToBeTested()
    }

    functionToBeTested(){
        let argList = this.state.argList
        argList = argList.reduce(function(prev, current){
            return `${prev}${current} ,`
        },'')
        //Sempre sobra uma virgula no final
        argList = argList.slice(0, -1); //remove a virgula
        return(<React.Fragment>{argList}</React.Fragment>)
        
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    {/* <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" id='nameForm'
                            name="Name" value={this.state.testForm.Name}
                            onChange={e=>this.updateField(e)}
                            placeholder="Digite o nome aqui..."/>
                        </div>
                    </div> */}
                    <Form width={4} widthM={12} {...this.nameValidation}/>
                    
                    <Form width={8} widthM={12} {...this.descriptionValidation}/>

                    <Form width={4} widthM={10} {...this.argsValidation}/>
                    
                    <button className="btn btn-secundary add" onClick={e => this.addArg(e)}>+</button>
                    
                    <p className="text-danger">{this.state.name || 'function'}</p><strong>(</strong>{this.functionToBeTested()}<strong>)</strong>
                    
                    {/* <span> TODO -------------- Exemplo da função a ser executada...
                        Preparando: <strong>{`${this.state.name || "function"}`}</strong>
                        (  )
                    </span> */}
                    <hr/>
                    {/* <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" id='emailForm'
                            name="Description" value={this.state.testForm.Description}
                            onChange={e=>this.updateField(e)}
                            placeholder="Digite o e-mail aqui..."/>
                        </div>
                    </div> */}
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

    load(testForm){
        this.setState({testForm})
    }

    remove(testForm){
        axios.delete(`${baseUrl}/${testForm.ID_testForm}`).then(resp => {
            const list = this.getUpdatedList(testForm, false)
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
        return this.state.list.map(testForm=>{
            return(
                <tr key={testForm.ID_testForm}>
                    <td>{testForm.Name}</td>
                    <td>{testForm.Description}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(testForm)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(testForm)}>
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