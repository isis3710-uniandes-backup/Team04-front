import React, {Component} from 'react';
import './MainView.css';
import ListLocations from './ListLocations.js';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import DatePicker from "react-datepicker";
import ReactDOM from 'react-dom';
import Login from "../../src/login/Login"
 
import "react-datepicker/dist/react-datepicker.css";

class MainView extends Component{
    constructor(props){
        super(props);
        this.state = {
            listLocations: [],
            fechaPartida: new Date(),
            fechaRegreso: new Date(),
            precioMaxNoche: 1008214,
            partida: 'Bogotá',
            llegada: 'Cartagena'
        }

        this.handleChangePartida = this.handleChangePartida.bind(this);
        this.handleChangeRegreso = this.handleChangeRegreso.bind(this);
        this.addLocation = this.addLocation.bind(this);
        //console.log(this.props.usuario);
      
    }
    

    handleChangePartida(date){
        this.setState({
            fechaPartida: date
        });
    }

    handleChangeRegreso(date){
        this.setState({
            fechaRegreso: date
        });
    }
    renderLocations(){
        return this.state.listLocations.map( (location,i) =>{
            return (<ListLocations data={location} key={i++}></ListLocations>)
        })
    }

    addLocation(){
        var partida = document.getElementById('inLocationPartida').value;
        var llegada = document.getElementById('inLocationLlegada').value;
        var fechaPartida = this.state.fechaPartida;
        var fechaRegreso = this.state.fechaRegreso;
        var tipoHabitacion = document.getElementById('controlHabitacion').value;
        var tipoTransporte = document.getElementById('controlTransporte').value;
        var data = {partida: partida, llegada: llegada, fechaPartida: fechaPartida, fechaRegreso: fechaRegreso}
        var locations = this.state.listLocations;
        locations.push(data);
        this.setState({
            listLocations: locations
        })
    }

    sendLogin(){
        ReactDOM.render(<Login />, document.getElementById('root'));
    }

    render(){
        return(
            <div className="container-fluid main">
                <div className="container-fluid" id="containerLoginButtons">
                    <button className="btn btn-primary" id="loginButton" type="button" onClick={this.sendLogin.bind(this)} > Login/Sign In</button>
                </div>
                <div className="container-fluid banner" id="mainBanner">
                    <h1>MultiTravel</h1>
                </div>

                <div className="container-fluid content row" id="contentMainView">

                    <div className="col-2 listSelectedLocations">
                        <div className="card" >
                            <div className="card-header">
                            Lista de Lugares Seleccionados
                            </div>
                            <ul className="list-group list-group-flush">
                                {this.renderLocations()}
                            </ul>
                            <div className=" btn-verMapa">
                                <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#mapaCompleto"> Ver ruta completa</button>

                                {/* modal mapa completo*/}
                                <div className="modal fade" id="mapaCompleto" tabIndex="-1" role="dialog" aria-labelledby="mapaModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="ubicacionModalLabel">Mapa de ruta de todos los lugares seleccionados</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div className="modal-body">
                                                <h2>Body</h2>
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button"className="btn btn-primary">Save changes</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="btn-agregarLocation">
                                <button className="btn btn-primary" type="button" onClick={this.addLocation}> Agregar</button>
                            </div>

                        </div>
                    </div>

                    <div className="container col-10 inputData text-left">
                        <div className="row">
                            <div className="container-fluid text-left col">
                                <label id="buscarSalida">Lugar Partida:</label>
                                
                                <div className="input-group md-form form-sm form-1 pl-0">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text purple lighten-3" id="basic-text1">
                                            <MaterialIcon icon="search" color="#272F32" size={30}></MaterialIcon>
                                        </span>
                                    </div>
                                    <input id="inLocationPartida" className="form-control my-0 py-1" type="text" placeholder="Search" defaultValue={this.state.partida} aria-label="Search"/>
                                </div>
                            </div>

                            <div className="container-fluid text-left col">
                                <label id="buscarSalida">Lugar Llegada:</label>
                                
                                <div className="input-group md-form form-sm form-1 pl-0">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text purple lighten-3" id="basic-text1">
                                            <MaterialIcon icon="search" color="#272F32" size={30}></MaterialIcon>
                                        </span>
                                    </div>
                                    <input id="inLocationLlegada" className="form-control my-0 py-1" type="text" placeholder="Search" defaultValue={this.state.llegada} aria-label="Search"/>
                                </div>
                            </div>
                            
                            <div className="container-fluid text-left col">
                                <label id="buscarSalida">Fecha Partida:</label>
                                <DatePicker id="dateFechaPartida"
                                    selected={this.state.fechaPartida} 
                                    onChange={this.handleChangePartida}
                                />
                            </div>
                        
                        
                            <div className="container-fluid text-left col">
                                <label id="buscarSalida">Fecha Regreso:</label>
                                <DatePicker id="dateFechaRegreso" 
                                    selected={this.state.fechaRegreso} 
                                    onChange={this.handleChangeRegreso}
                                />
                            </div>

                            <div className="container-fluid text-left col">
                                <label id="buscarSalida">Tipo de Habitación:</label>
                                <select className="form-control" id="controlHabitacion">
                                <option>Individual</option>
                                <option>Doble</option>
                                <option>Familiar</option>
                                <option>Múltiple</option>
                                </select>
                            </div>

                            <div className="container-fluid text-left col">
                                <label id="buscarSalida">Tipo de Transporte:</label>
                                <select className="form-control" id="controlTransporte">
                                <option>Aire</option>
                                <option>Mar</option>
                                <option>Tierra</option>
                                </select>
                            </div>

                            <div className="container-fluid text-left col">
                                <button className="btn btn-primary" type="button" id="buscar">Buscar</button>
                            </div>
                        </div>

                        <div className="row ">
                            <div className="container-fluid text-left col" id="precioMaxNoche">
                                <label id="buscarSalida">Precio por noche:</label>
                                <div className="row">
                                
                                <input type="range" className="form-control-range col" id="formControlRange"></input>
                                <label className="col">{this.state.precioMaxNoche}</label>
                                </div>
                            </div>

                            <div className="container-fluid text-left col">
                                <label id="buscarSalida">Número de estrellas:</label>
                                <div className="row">
                                    <div className="container">
                                        <div className="starrating risingstar d-flex justify-content-center flex-row-reverse">
                                            <input type="radio" id="star5" name="rating" value="5"/>
                                            <label htmlFor="star5" title="5 star">5</label>
                                            <input type="radio" id="star4" name="rating" value="4"/>
                                            <label htmlFor="star4" title="4 star">4</label>
                                            <input type="radio" id="star3" name="rating" value="3"/>
                                            <label htmlFor="star3" title="3 star">3</label>
                                            <input type="radio" id="star2" name="rating" value="2"/>
                                            <label htmlFor="star2" title="2 star">2</label>
                                            <input type="radio" id="star1" name="rating" value="1"/>
                                            <label htmlFor="star1" title="1 star">1</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid text-left col">
                                <label id="labelPuntuacion">Puntuación:</label>
                                <select className="form-control" id="selectPuntuación">
                                <option>8.5+</option>
                                <option>7.5 - 8.4</option>
                                <option>6.5 - 7.4</option>
                                <option>5.5 - 6.4</option>
                                <option>4.5 - 5.4</option>
                                <option>3.5 - 4.4</option>
                                <option>2.5 - 3.4</option>
                                <option>1.5 - 2.4</option>
                                <option>0.5 - 1.4</option>
                                </select>
                            </div>

                            <div className="container-fluid text-left col">
                                <label>Ubicación</label>
                                <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#ubicacionModal">
                                Ubicación</button>

                                {/* modal ubicación*/}
                                <div className="modal fade" id="ubicacionModal" tabIndex="-1" role="dialog" aria-labelledby="ubicacionModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="ubicacionModalLabel">Modal Title</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div className="modal-body">
                                                <h2>Body</h2>
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button"className="btn btn-primary">Save changes</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid text-left col">
                                <label>Más filtros</label>
                                <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#filtrosModal">
                                Filtros</button>

                                {/* modal ubicación*/}
                                <div className="modal fade" id="filtrosModal" tabIndex="-1" role="dialog" aria-labelledby="filtrosModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="filtrosModalLabel">Modal Title</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div className="modal-body">
                                                <h2>Body</h2>
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button"className="btn btn-primary">Save changes</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MainView;