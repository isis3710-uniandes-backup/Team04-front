import React, { Component } from 'react';
import './MainView.css';
import ListLocations from './ListLocations.js';
import MaterialIcon, { colorPalette } from 'material-icons-react';
import DatePicker from "react-datepicker";
import Stars from './Stars.js';
import Combobox from './Combobox.js';
import "react-datepicker/dist/react-datepicker.css";
import HostalData from './HostalData.js';
import TransportData from './TransportData.js';
import Busqueda from './Busqueda';
import ReactDOM from 'react-dom';
import Login from '../login/Login'

function new_script(src) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', function () {
            resolve();
        });
        script.addEventListener('error', function (e) {
            reject(e);
        });
        document.body.appendChild(script);
    })
};

let my_script = new_script('http://js.api.here.com/v3/3.0/mapsjs-core.js');
let my_script2 = new_script('http://js.api.here.com/v3/3.0/mapsjs-service.js');

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listLocations: [],
            fechaPartida: new Date(),
            fechaRegreso: new Date(),
            precioMaxNoche: 1008214,
            partida: 'Bogotá',
            llegada: 'San Andrés',
            resultadosBusqueda: "",
            user: "",
            viajeCreado: false,
            status: 'start',
            status2: 'start'
        }



        this.handleChangePartida = this.handleChangePartida.bind(this);
        this.handleChangeRegreso = this.handleChangeRegreso.bind(this);
        this.addLocation = this.addLocation.bind(this);
        this.compareHostales = this.compareHostales.bind(this);
        this.buscar = this.buscar.bind(this);
        this.renderBusqueda = this.renderBusqueda.bind(this);
        this.subViajes = this.subViajes.bind(this);
        this.CrearViaje = this.CrearViaje.bind(this);
        this.MapaUbicacion = this.MapaUbicacion.bind(this);

        if (typeof this.props.usuario !== 'undefined') {
            if (this.props.usuario.logueado) {
                this.state.user = this.props.usuario;
            }
        }

    }

    do_load = () => {
        var self = this;
        my_script.then(function () {
            self.setState({ 'status': 'done' });
            console.log(self.state.status);
        }).catch(function () {
            self.setState({ 'status': 'error' });
            
        })
    }

    do_load2 = () => {
        var self = this;
        my_script2.then(function () {
            self.setState({ 'status2': 'done' });
            console.log(self.state.status2);
        }).catch(function () {
            self.setState({ 'status2': 'error' });
        })
    }

    MapaUbicacion() {
        // Initialize the platform object:
        var platform = new H.service.Platform({
            'app_id': '5Lv1fjsT6couwKfFfZaa',
            'app_code': 'fb9p057aNhZJ6Srk5GnPdQ'
        });

        // Obtain the default map types from the platform object
        var maptypes = platform.createDefaultLayers();

        // Instantiate (and display) a map object:
        var map = new H.Map(
            document.getElementById('mapContainer'),
            maptypes.normal.map,
            {
                zoom: 10,
                center: { lng: 13.4, lat: 52.51 }
            });

    }

    handleChangePartida(date) {
        this.setState({
            fechaPartida: date
        });
    }

    handleChangeRegreso(date) {
        this.setState({
            fechaRegreso: date
        });
    }
    renderLocations() {
        return this.state.listLocations.map((location, i) => {
            return (<ListLocations data={location} key={i++}></ListLocations>)
        })
    }

    addLocation() {
        var partida = document.getElementById('inLocationPartida').value;
        var llegada = document.getElementById('inLocationLlegada').value;
        var fechaPartida = this.state.fechaPartida;
        var fechaRegreso = this.state.fechaRegreso;
        var tipoHabitacion = document.getElementById('controlHabitacion').value;
        var tipoTransporte = document.getElementById('controlTransporte').value;
        var data = { partida: partida, llegada: llegada, fechaPartida: fechaPartida, fechaRegreso: fechaRegreso, tipoHabitacion: tipoHabitacion, tipoTransporte: tipoTransporte }
        var locations = this.state.listLocations;
        locations.push(data);
        this.setState({
            listLocations: locations
        })
    }


    subViajes() {

        const arraySubViajes = this.state.listLocations;
        const subViajes2 = [];
        let i = 0;



        arraySubViajes.map(viaje => {

            let diaLlegada = viaje.fechaPartida.getDate();
            let monthLlegada = viaje.fechaPartida.getMonth();
            let yearLlegada = viaje.fechaPartida.getFullYear();
            let dateStringLlegada = diaLlegada + "-" + (monthLlegada + 1) + "-" + yearLlegada;

            let diaPartida = viaje.fechaRegreso.getDate();
            let monthPartida = viaje.fechaRegreso.getMonth();
            let yearPartida = viaje.fechaRegreso.getFullYear();
            let dateStringPartida = diaPartida + "-" + (monthPartida + 1) + "-" + yearPartida;
            const viaje2 = {
                nombre: "sub-viaje" + i,
                empresa: "empresa",
                metodoDeViaje: "Viaje " + viaje.tipoTransporte,
                fechaInicio: dateStringLlegada,
                fechaFin: dateStringPartida,
                origen: viaje.partida,
                destino: viaje.llegada,
            }
            subViajes2.push(viaje2);
        })

        return subViajes2;
    }
    CrearViaje() {
        let me = this;
        let subViajesact = this.subViajes();
        if (this.state.listLocations.length === 0) {
            this.setState({ viajeCreado: "0" });
        }
        else {
            if (typeof this.state.user.idUsuario === 'undefined') {
                ReactDOM.render(<Login />, document.getElementById('root'));
            }
            else {

                fetch('/viajes', {
                    method: 'POST',
                    body: JSON.stringify({
                        idUsuario: me.state.user.idUsuario,
                        nombre: "viaje1",
                        empresa: "empresa1",
                        fechaInicio: me.state.listLocations[0].fechaPartida,
                        fechaFin: me.state.listLocations.slice(-1).pop().fechaRegreso,
                        origen: me.state.listLocations[0].partida,
                        destino: me.state.listLocations.slice(-1).pop().llegada,
                        subViajes: subViajesact,
                        viajeAgendado: true
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(function (response) {
                        me.setState({ viajeCreado: response.statusText });
                        return response.json();
                    }).then(function (body) {
                        me.state.viajeCreado = true;
                    });
            }

        }



    }

    buscar() {
        var partida = document.getElementById('inLocationPartida').value;
        var llegada = document.getElementById('inLocationLlegada').value;
        let me = this;
        fetch('http://localhost:3001/hostales/cities/' + llegada).then(response => {
            JSON.parse(response);
        }).then(responseHostales => {
            fetch('http://localhost:3001/transportes/' + partida + '/' + llegada).then(response => {
                JSON.parse(response);
            }).then(responseTransportes => {

                //TODO después de tener los hostales de la ciudad de llegada --primer fetch -- y de tener los transportes de partida
                // y llegada; cómo obtener los más baratos y renderizarlos en parejas. (Lo de renderizarlos en parejas es solo mandarlos al componente Busqueda --revisarlo--)
                me.renderBusqueda(responseHostales, responseTransportes);
            })
        })
    }

    compareHostales(a, b) {
        if (a.precio < b.precio) {
            return -1;
        } else if (a.precio > b.precio) {
            return 1;
        } else { return 0 }
    }

    renderBusqueda(responseHostales, responseTransportes) {

        // TODO Cómo traer los hostale más baratos y los transportes más baratos? 
        //resultado.transporte es solo un ejemplo de lo que podría ser
        return this.state.resultadosBusqueda.map((resultado, i) => {
            return (<Busqueda id={i++} key={i++} transporte={resultado.transporte} alojamiento={resultado.alojamiento}></Busqueda>);
        })
    }

    sendLogin() {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }

    render() {

        var self = this;
        if (self.state.status === 'start' && self.state.status2 === 'start') {
            self.state.status = 'loading';
            setTimeout(function () {
                self.do_load();
                self.do_load2();
            }, 0);
        }
        //TODO a renderBusqueda en la linea 294 le hace falta los parametros
        let viajeConfirmation = false;

        if (this.state.viajeCreado === "Created") {
            viajeConfirmation = "Viaje Creado";
        }
        else if (this.state.viajeCreado === "0") {
            viajeConfirmation = "No hay viajes agregados";
        }
        return (
            <div className="main">
                <div className="container-fluid" id="containerLoginButtons">
                    <button className="btn btn-primary" id="loginButton" type="button" onClick={this.sendLogin.bind(this)} > Login/Sign In</button>
                </div>
                <div className="bannerr" id="mainBanner">
                    <h1>MultiTravel</h1>
                </div>

                <div className="content row" id="contentMainView">

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
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="btn-agregarLocation">
                                <button className="btn btn-primary" type="button" onClick={this.addLocation}> Agregar</button>
                                <br></br>
                            </div>
                            <div className="btn-CrearViaje">
                                <button className="btn btn-primary" type="button" onClick={this.CrearViaje}> Crear Viaje</button>
                            </div>

                            <small className="confirmation">{viajeConfirmation ? viajeConfirmation : ""}</small>

                        </div>
                    </div>

                    <div className="col-10 inputData text-left">
                        <div className="row">
                            <div className=" text-left col">
                                <label id="lbBuscarPartida">Lugar Partida:</label>

                                <div className="input-group md-form form-sm form-1 pl-0">
                                    {/* <div className="input-group-prepend">
                                        <span className="input-group-text purple lighten-3" id="basic-text1">
                                            <MaterialIcon icon="search" color="#272F32" size={30}></MaterialIcon>
                                        </span>
                                    </div> */}
                                    <input id="inLocationPartida" className="form-control my-0 py-1" type="text" placeholder="Search" defaultValue={this.state.partida} aria-label="Search" />
                                </div>
                            </div>

                            <div className="text-left col">
                                <label id="lbBuscarLlegada">Lugar Llegada:</label>

                                <div className="input-group md-form form-sm form-1 pl-0">
                                    <div className="input-group-prepend">
                                        {/* <span className="input-group-text purple lighten-3" id="basic-text1">
                                            <MaterialIcon icon="search" color="#272F32" size={30}></MaterialIcon>
                                        </span> */}
                                    </div>
                                    <input id="inLocationLlegada" className="form-control my-0 py-1" type="text" placeholder="Search" defaultValue={this.state.llegada} aria-label="Search" />
                                </div>
                            </div>

                            <div className="text-left col">
                                <label id="lbBuscarFechaPartida">Fecha Partida:</label>
                                <DatePicker id="dateFechaPartida"
                                    selected={this.state.fechaPartida}
                                    onChange={this.handleChangePartida}
                                />
                            </div>


                            <div className="text-left col">
                                <label id="lbBuscarFechaRegreso">Fecha Regreso:</label>
                                <DatePicker id="dateFechaRegreso"
                                    selected={this.state.fechaRegreso}
                                    onChange={this.handleChangeRegreso}
                                />
                            </div>

                            <div className="text-left col">
                                <label id="lbBuscarTipoHabitacion">Tipo de Habitación:</label>
                                <Combobox id="controlHabitacion" options={['Individual', 'Doble', 'Familiar', 'Múltiple']}></Combobox>
                            </div>

                            <div className="text-left col">
                                <label id="lbBuscarTipoTransporte">Tipo de Transporte:</label>
                                <Combobox id="controlTransporte" options={['Aire', 'Mar', 'Tierra']} id="controlTransporte"></Combobox>
                            </div>

                            <div className="text-left col">
                                <button className="btn btn-primary" type="button" id="buscar">Buscar</button>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="text-left col" id="precioMaxNoche">
                                <label id="lbBuscarPrecioNoche">Precio por noche:</label>
                                <div className="row">

                                    <input type="range" className="form-control-range col" id="formControlRange"></input>
                                    <label className="col">{this.state.precioMaxNoche}</label>
                                </div>
                            </div>

                            <div className="text-left col">
                                <Stars></Stars>
                            </div>

                            <div className=" text-left col">
                                <label id="labelPuntuacion">Puntuación:</label>

                                <Combobox options={['8.5+', '7.5 - 8.4', '6.5 - 7.4', '5.5 - 6.4', '4.5 - 5.4', '3.5 - 4.4', '2.5 - 3.4', '1.5 - 2.4', '0 - 1.4']} id="controlPuntuacion"></Combobox>
                            </div>

                            <div className="text-left col">
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
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-left col">
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

                                            <div className="modal-body" id="map">
                                                {self.state.status}   {self.state.status === 'done' && this.MapaUbicacion}
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="card">
                            <div className="accordion" id="accordionResultados">
                                {this.state.resultadosBusqueda}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MainView;