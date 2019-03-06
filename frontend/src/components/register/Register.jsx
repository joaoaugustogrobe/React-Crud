import './Register.css'
import React, {Component} from 'react'
import Main from '../template/Main'
import Form from '../Util/Form'
import axios from 'axios'
import Toast from '../Util/Toast';


const baseUrl = 'http://localhost:3001'
const headerProps = {
    icon: 'sign-in',
    title: 'Registrar',
    subtitle: 'Você precisa estar logado para acessar o sistema.',
}



export default class Login extends Component{
    constructor(props){
        super(props)

        this.child = React.createRef()
        this.state = {
            username:'',
            password:'',
            email:'',
            //MUST be equal to form text
            Email:false,
            Username:false,
            Password:false,
            toastMessage:'false'
        }
    }
    setFormValid(form, value){
        switch(form){
            case 'Username' : this.setState({Username:value}); break
            case 'Email' : this.setState({Email:value}); break
            case 'Password' : this.setState({Password:value}); break
            case 'username' : this.setState({username:value}); break
            case 'email' : this.setState({email:value}); break
            case 'password' : this.setState({password:value}); break
            default:
        }
        //this.setstate( {this.state[form]:value} )
    }
    componentDidMount(){
        if(this.props.connection !== "Connected") this.props.setConnection("Connected", "not required")
    }

    handleSubmit(e){
        e.preventDefault()
        if(this.state.Username && this.state.Password && this.state.Email){
            let user={
                username:this.state.username,
                password:this.state.password,
                email:this.state.email
            }
            console.log(`${baseUrl}/register`)
            axios.post(`${baseUrl}/register`,user).then(resp =>{
                localStorage.setItem('SessionToken', resp.data.token)
                this.newToast("Usuário cadastrado com sucesso!")
                window.location.href = "/home"
            }).catch(err => {
                console.log(err.response.status)
                switch(err.response.status){
                    case 409: this.newToast("Usuário já esta cadastrado!");break
                    default:  this.newToast("Ocorreu um erro com o servidor, tente novamente mais tarde.")
                }
            })
        }else{
            if(!this.state.password || !this.state.username || !this.state.email){
                this.newToast("Todos os campos devem ser preenchidos.")
            }else{
                this.newToast("Existem campos invalidos.")
            }
        }
            
        
    }
        nameValidation = {
            text:"Username",
            textHelper:"*Obrigatorio",
            placeholder:"Insira seu RA",
            setFormValid: this.setFormValid.bind(this) || 'a',
            validation: [{
                    validationType:"numbers",
                    textWhenInvalid:"Seu RA deve conter apenas números."},
                {
                validationType:"length",
                args:{ min:7, max:7 },
                textWhenInvalid:"Seu RA deve conter 7 números."}
            ]
        }
        emailValidation = {
            type:"text",
            text:"Email",
            textHelper:"*Obrigatorio",
            placeholder:"Insira seu email",
            setFormValid: this.setFormValid.bind(this),
            validation: [{
                validationType:"email",
                textWhenInvalid:"Email invalido."}
            ]
        }
        passwordValidation = {
            type:"password",
            text:"Password",
            textHelper:"*Obrigatorio",
            placeholder:"Insira sua senha",
            setFormValid: this.setFormValid.bind(this),
            validation: [{
                validationType:"length",
                textWhenInvalid:"Sua senha deve ter pelo menos 8 caracters",
                args:{ min:8, max:160 }
            }
            ]
        }
        /*
        passwordConfirm = {
            type:"password",
            text:"Confirme sua senha",
            textHelper:"*Obrigatorio",
            placeholder:"Insira sua senha",
            value:this.state.passwordConfirm,
            validation: [{
                validationType:"length",
                textWhenInvalid:"Sua senha deve ter pelo menos 8 caracters",
            },
            {
                validationType:"password",
                textWhenInvalid:"As duas senhas precisam ser iguais.",
                args: {password: this.state.confirmPassword}}
            ]
        }
        updateConfirm(passwordConfirm){
            this.setState({
                passwordConfirm
            })
        }
        updatePwd(password){
            this.setState({
                password
            })
        }
        verifyPwd(){
            return(this.state.password === this.state.confirmPassword)
        }*/
        newToast = (message) => {
            this.setState({toastMessage:message})
            this.child.current.show();
        };

    render(){
            return(
                <React.Fragment>
                    <Toast message={this.state.toastMessage} time={3000} ref={this.child}/>
                    <Main {...headerProps}>
                        <form action="/login">
                            <div className="row">
                                <Form {...this.nameValidation}/>
                                <Form {...this.emailValidation}/>
                            </div><div className="row">
                                <Form {...this.passwordValidation}/>
                            </div>
                            <div className="d-flex  flex-row-reverse">
                                <input className="btn btn-primary" type="submit" value="Registrar" onClick={(e) => this.handleSubmit(e)}/>
                                <a className="btn btn-secundary" href="/login">Ja possue cadastro ?</a>
                            </div>
                        </form>

                    </Main>
                </React.Fragment>
        )
    }
}