import React, {Component} from 'react';
import './ListLocations.css';

class ListLocations extends Component{
    constructor(props){
        super(props);
        this.state ={
            partida: this.props.data.partida,
            llegada: this.props.data.llegada,
            fechaPartida: this.props.data.fechaPartida,
            fechaRegreso: this.props.data.fechaRegreso,
            tipoHabitacion: this.props.data.tipoHabitacion,
            tipoTransporte: this.props.data.tipoTransporte
        }
    }
    render(){
        return(
            <a className="list-group-item list-group-item-action">
                <h6>Punto de partida: {this.props.data.partida}</h6>
                <h6>Punto de Llegada: {this.props.data.llegada}</h6>
            </a>
        )
    }
}

export default ListLocations;