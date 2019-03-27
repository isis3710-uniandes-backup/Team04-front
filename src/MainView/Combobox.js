import React, { Component } from 'react';
import './Combobox.css';

class Combobox extends Component{
    constructor(props){
        super(props)
        this.renderOptions = this.renderOptions.bind(this);
    }

    renderOptions(options){
        return options.map((option, i) =>{
           return (<option key={i++}>{option}</option>)
        })
    }

    render(){
        return(
            <select className="form-control" id={this.props.id}>
              {this.renderOptions(this.props.options)}  
            </select>
        )
    }
}

export default Combobox;