import './Overlay.css'
import React, {Component} from 'react'


export default class Overlay extends Component{
    render(){
        if(this.props.connection === "Disconnected")
            return(
            <div className="Overlay">
                <div className="errorContainer">
                    <div className="ErrorIcon">
                        <p className="fa fa-spinner fa-spin"></p>
                    </div>
                    <div className="ErrorTitle">{this.props.connection}</div>
                    <div className="ErrorDescription">{this.props.connectionDescription}</div>
                </div>
            </div>
            )
        else
            return(<div></div>)
    }
}