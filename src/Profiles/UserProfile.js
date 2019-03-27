import React from "react"

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
            method: 'POST',
            body: JSON.stringify({
                idUsuario: idusuario,
                nombre: "viaje1",
                empresa: "empresa",
                fechaInicio: new Date(),
                fechaFin: new Date(),
                origen: "Bogotá",
                destino: "San Andrés",
                subViajes: [{
                    nombre: "sub-viaje1",
                    empresa: "empresa",
                    metodoDeViaje: "Viaje aereo",
                    fechaInicio: new Date(),
                    fechaFin: new Date(),
                    origen: "Bogotá",
                    destino: "Medellín",
                }, {
                    nombre: "sub-viaje2",
                    empresa: "empresa",
                    metodoDeViaje: "Viaje Marítimo",
                    fechaInicio: new Date(),
                    fechaFin: new Date(),
                    origen: "Medellín",
                    destino: "San Andrés",
                }],
                viajeAgendado: true
            }),
            headers: { "Content-Type": "application/json" }
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
            });

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

            <div className="content">
                <div>
                    <img className="profile" src="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" height="200px" width="200px" alt="profile pic" />
                    <h2 className="nombres">{user.nombres}</h2>
                    <p>{user.nacionalidad}</p>
                    <p>{user.nacimiento}</p>
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
                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseTwo12"
                                            aria-expanded="false" aria-controls="collapseTwo12">
                                            <h5 className="mb-0">
                                                {viaje.origen + "-" + viaje.destino} <i className="fas fa-angle-down rotate-icon"></i>
                                            </h5>
                                        </a>
                                    </div>
                                    <div id="collapseTwo12" className="collapse" role="tabpanel" aria-labelledby="headingTwo1" data-parent="#accordionEx1">
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
        )
    }
}

export default User;