import React, { Component} from 'react';
import './TransportData.css';

class TransportData extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            image: '',
            rutas: [],
            origen: '',
            destino: ''
        }

        var transportData = this.props.data;
        this.setState({
            id: this.props.id,
            image: transportData.image,
            rutas: transportData.rutas,
            origen: transportData.origen,
            destino: transportData.destino
        })
    }

    setDataToState(){
        
    }

    render(){
        //TODO El atributo rutas de los servicios tiene que ser cambiados para poder realizar el dibujo en Google Maps
        return(
            <div className="card mb-12" id={this.state.id}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={this.state.image} onerror="this.src = 'mainIcon.png' " alt="Imagen Empresa"></img>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <label>ruta: </label>
                            <label>Ruta{/*Aquí podría estar indicada la ruta en google maps para que el usuario la vea, no necesariamente un label*/}</label>
                            <label>Origen: </label> <label>{this.state.origen}</label>
                            <label>Destino: </label> <label>{this.state.destino}</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TransportData