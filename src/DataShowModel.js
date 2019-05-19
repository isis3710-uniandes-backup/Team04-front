import React, {Component} from 'react';
import AuxiliarData from './AuxiliarData'
import * as d3 from 'd3';
import { ftruncate } from 'fs';
export default class DataShowModel extends Component{

    state = {
        categorizar: "user",
        network: null
    
    }

    handleOptionChange = (changeEvent) => {
        console.log("onHandleOptionChange");
        this.setState({
            categorizar: changeEvent.target.value
        })
    }
    componentDidMount= () => {
        let url= "/datosHistoricos";
        var misCabeceras = new Headers();
        var miInit = {
            headers: misCabeceras,
            method: 'GET',
            mode: 'cors'
        }
        let context = this;
        fetch(url, miInit)
        .then(function(response){
           return response.json();
        })
        .then(function(response){
            let n = Object.keys(response).length;
            let promiseNodes = new Promise(function(resolve, reject){
                const network = {
                    nodes: response.map(dato =>({
                        location: dato.location,
                        tipoViaje: dato.tipoViaje,
                        empresa: dato.empresa,
                        userID: dato.userID
                    }))
                    ,
                    links: d3.range(n*1).map( (i) => ({
                        source: i%n,
                        target: Math.floor(Math.random()*n)
                    }))
                }
                resolve(network);
            });
            promiseNodes.then(function(network){
                context.setState({
                    network: network
                })
            });
        })
    }
    render(){
        let style = {
            width: '100%',
            height: '100%'
        }
        let grafico = (<AuxiliarData style ={style} selectedOption={this.state.categorizar} network={this.state.network }></AuxiliarData>);
        if(this.state.network == null) grafico = null;
        return(
            
            <div style={style}>
                {console.log(this.state.network)}
                {grafico}
                <div style={{height: "30%", width: "100%"}} >
                    <form>
                        <div className="radio">
                            <label htmlFor="radioEmpresa">
                                <label>Empresa </label>
                                <input id="radioEmpresa" type="radio" value="empresa" checked={this.state.categorizar == "empresa"} onChange={this.handleOptionChange}></input>
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <label>Location </label> 
                                <input type="radio" value="location" checked={this.state.categorizar == "location"} onChange={this.handleOptionChange}></input>
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <label>Tipo Viaje </label>
                                <input type="radio" value="tipoViaje" checked={this.state.categorizar == "tipoViaje"} onChange={this.handleOptionChange}></input>
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <label>Usuario </label>
                                <input type="radio" value="user" checked={this.state.categorizar == "user"} onChange={this.handleOptionChange}></input>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
