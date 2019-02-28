import React, {Component} from 'react'
import './Toast.css'

export default class Toast extends Component{
    constructor(props){
        super(props)
        this.state={
            show:this.props.toast,
            message:this.props.message
        }
    }

    
    show(){       
        this.setState({show:true})
        setTimeout(() => {
            this.setState({show:false})
        }, this.props.time)
    }
    
  
    
    render(){
        return(
            <div className={`toast ${this.state.show ? "show":""}`}>{this.props.message}</div>
        )
    }
}