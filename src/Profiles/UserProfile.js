import React from "react"

import MaterialIcon from 'material-icons-react';

let viajes = [];
class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: true
        };
    }
    componentDidMount() {
        let me = this;

        let idusuario = this.props.usuario.idUsuario;
        fetch('/viajes', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                for (let viaje of body) {
                    if (viaje.idUsuario === idusuario) {

                        viajes.push(viaje);
                    }
                }
                me.setState({ response: false });
            });
    }

    render() {
        let user = this.props.usuario;

        if (this.state.response) {
            return 'Loading...'
        }

        return (
            <div>
                <center>
                <div>
                    <nav className="navbar fixed-bottom navbar-light bg-light navbar-expand-lg" id="mainNavbar">
                        <div className="container fluid">
                            <div className="col">
                                <a className="navbar-brand" href="/app" arial-label="MultiTravel">
                                    <img className="iconHome" src="/icons/mainIcon.png" height="40px" width="60px" alt="Home"></img>
                                </a>
                            </div>

                            <div className="col">
                                <a className="navbar-brand" href="/app">
                                    <MaterialIcon icon="person" size={45} color='#272F32' alt="Profile"></MaterialIcon>
                                </a>
                            </div>
                            <div className="col">
                                <a className="navbar-brand" id="locationbutton" href="/app">
                                    <MaterialIcon icon="location_on" size={40} color='#272F32' alt="Locations"></MaterialIcon>
                                </a>
                            </div>
                        </div>
                    </nav>
                    
                </div>
                </center>
                <div className="content">
                    <div className="banner">
                        <img className="profile" src="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" height="233px" width="200px" alt="profile pic" />
                        <h2 className="nombres">{user.nombres}</h2>
                        <p className="right">{user.correo}</p>
                        <p>{user.nacionalidad}</p>
                        <p>{user.fechaNacimiento}</p>
                    </div>
                    <h2 className="subT">Viajes Agendados</h2>
                    <div className="accordion md-accordion" id="accordionEx1" role="tablist" aria-multiselectable="true">
                        {viajes.map(viaje =>
                            viaje.viajeAgendado ? (<div className="card">
                                <div className="card-header" role="tab" id="headingTwo1">
                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href={"#collapseTwo" + viaje.id}
                                        aria-expanded="false" aria-controls={"collapseTwo" + viaje.id}>
                                        <h5 className="mb-0">
                                            {viaje.origen + "-" + viaje.destino} <i className="fas fa-angle-down rotate-icon"></i>
                                        </h5>
                                    </a>
                                </div>
                                <div id={"collapseTwo" + viaje.id} className="collapse" role="tabpanel" aria-labelledby="headingTwo1" data-parent="#accordionEx1">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-2 travelsParams ">Origen</div>
                                            <div className="col-sm-2 travelsParams">Destino</div>
                                            <div className="col-sm-2 travelsParams">Tipo de viaje</div>
                                            <div className="col-sm-2 travelsParams">Fecha llegada</div>
                                            <div className="col-sm-2 travelsParams">Fecha salida</div>
                                        </div>
                                        {viaje.subViajes.map(subV =>
                                            <div className="row">
                                                <div className="col-sm-2">{subV.origen}</div>
                                                <div className="col-sm-2">{subV.destino}</div>
                                                <div className="col-sm-2">{subV.metodoDeViaje}</div>
                                                <div className="col-sm-2">{subV.fechaInicio}</div>
                                                <div className="col-sm-2">{subV.fechaFin}</div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                            ) : ("")
                        )}
                        <h2 className="subT">Viajes Realizados</h2>
                        <div className="accordion md-accordion" id="accordionEx1" role="tablist" aria-multiselectable="true">
                            {viajes.map(viaje =>
                                !viaje.viajeAgendado ? (
                                    <div className="card">
                                        <div className="card-header" role="tab" id="headingTwo1">
                                            <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href={"#collapseTwo12" + viaje.id}
                                                aria-expanded="false" aria-controls="collapseTwo12">
                                                <h5 className="mb-0">
                                                    {viaje.origen + "-" + viaje.destino} <i className="fas fa-angle-down rotate-icon"></i>
                                                </h5>
                                            </a>
                                        </div>
                                        <div id={"collapseTwo12" + viaje.id} className="collapse" role="tabpanel" aria-labelledby="headingTwo1" data-parent="#accordionEx1">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-2 travelsParams ">Origen</div>
                                                    <div className="col-sm-2 travelsParams">Destino</div>
                                                    <div className="col-sm-2 travelsParams">Tipo de viaje</div>
                                                    <div className="col-sm-2 travelsParams">Fecha llegada</div>
                                                    <div className="col-sm-2 travelsParams">Fecha salida</div>
                                                </div>
                                                {viaje.subViajes.map(subV =>
                                                    <div className="row">
                                                        <div className="col-sm-2">{subV.origen}</div>
                                                        <div className="col-sm-2">{subV.destino}</div>
                                                        <div className="col-sm-2">{subV.metodoDeViaje}</div>
                                                        <div className="col-sm-2">{subV.fechaInicio}</div>
                                                        <div className="col-sm-2">{subV.fechaFin}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                ) : ("")
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;