import React, {Component} from 'react'
import './Form.css'
import validator from 'validator';


export default class Form extends Component{
    constructor(props){
        super(props)

        this.state = {
            type: props.type || 'text',                //text or password
            placeholder: props.placeholder || '',
            text: props.text,                          //Label of this form
            textHelper: props.textHelper || '',        //Default text message
            value: '',                                      //Form value
            invalidList: [],                                //list of failed validations - if empity the form is valid
            changed: false,                                 //This form has been changed at lest 1 time ? -used to not render error style when page load-
            validation: props.validation,
            setFormValid: props.setFormValid
            /*
            validation: [{
                validationType: props.validation.validationType, //length - require args, email, password, phone
                textWhenInvalid: props.validation.textWhenInvalid || 'Error!', //Default error message
                args: props.args
            }]*/
        }
    }

    async updateField (event){
        const value = event.target.value

        let invalidList = []
        this.state.validation.forEach(element => {//for each condition we need to verify if the value is valid
            this.verify(element, invalidList, value) //this array will contain all failed verifications, in the end of method we need set state only one time
        })                                      //value hasn't updated yet, we need send the correct value
        
        this.state.setFormValid(this.state.text.toLowerCase(), value) //Update the value on parent /// GAMBIARRA

        if(!this.state.changed){ //if this is first change
            this.setState({value, invalidList, changed:true}) //update var changed
        }else
            this.setState({value, invalidList})
    }


    verify(element, invalidList, value){
        
        switch(element.validationType){//performance suggestion: add a method pushElementIfNotExists and dont clear the array on every change
            case 'length':
                if(!validator.isByteLength(value, element.args)){
                    invalidList.push(element);/*Add this elemento to invalid list */;
                    this.state.setFormValid(this.state.text, false)
                    //this.state.setFormValid(this.state.this.state.text, false)
                }else{
                    this.state.setFormValid(this.state.text, true)
                }
                break

            case 'email':
                if(!validator.isEmail(value)){
                    invalidList.push(element);/*Add this elemento to invalid list */;
                    this.state.setFormValid(this.state.text, false)
                }else{
                    this.state.setFormValid(this.state.text, true)
                }
                break
            

            case 'numbers':
                if(!validator.isInt(value)){
                    invalidList.push(element);/*Add this elemento to invalid list */;
                    this.state.setFormValid(this.state.text, false)
                }else{
                    this.state.setFormValid(this.state.text, true)
                }
                break

            /*case 'password':
                this.props.callback(value);
                console.log("Valid pwd:" + this.props.verify())
                if(!this.props.verify()){
                    invalidList.push(element);/*Add this elemento to invalid list
                    console.log("Senha invalidas!")
        }       break*/
            default: console.log("Invalid validation type")
        }
    }
    
    render(){

        return(
        <div className="col-12 col-md-6">
            <div className="form-group">
                <label>{this.state.text}</label>
                <input type={this.state.type} className={`form-control ${!this.state.invalidList.length > 0 ? 'valid':'invalid' }`} id={this.state.text}
                name={this.state.text} value={this.state.value} //If valid OR not changed it's render a "valid" style, but it's still invalid. it's just
                onChange={e=>this.updateField(e)}               //to render a default style when page load
                placeholder={this.state.placeholder}/>
                <p className={`${!this.state.invalidList.length > 0 ? 'textHelper':'textWhenInvalid' }`}>
                {`${!this.state.invalidList.length > 0 ? this.state.textHelper : this.state.invalidList[0].textWhenInvalid}`}
                </p>
            </div>
            
        </div>
        )}
}