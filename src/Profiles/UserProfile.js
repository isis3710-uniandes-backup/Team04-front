import React from "react"

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let user = this.props.usuario;
        return (
            <div className="content">
                <div>
                    <img className="profile" src="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" height="200px" width="200px" />
                    <h2 className="nombres">{user.nombres}</h2>
                    <p>{user.nacionalidad}</p>
                    <p>{user.nacimiento}</p>
                </div>
                <h2 className="subT">Viajes Agendados</h2>
                <div class="accordion md-accordion" id="accordionEx1" role="tablist" aria-multiselectable="true">

                    <div class="card">

                        <div class="card-header" role="tab" id="headingTwo1">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseTwo1"
                                aria-expanded="false" aria-controls="collapseTwo1">
                                <h5 class="mb-0">
                                    Bogotá - San Andrés <i class="fas fa-angle-down rotate-icon"></i>
                                </h5>
                            </a>
                        </div>
                        <div id="collapseTwo1" class="collapse" role="tabpanel" aria-labelledby="headingTwo1" data-parent="#accordionEx1">
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-sm-2 travelsParams ">Origen</div>
                                    <div className="col-sm-2 travelsParams">Destino</div>
                                    <div className="col-sm-2 travelsParams">Tipo de viaje</div>
                                    <div className="col-sm-2 travelsParams">Fecha llegada</div>
                                    <div className="col-sm-2 travelsParams">Fecha salida</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">Bogotá</div>
                                    <div className="col-sm-2">Medellín</div>
                                    <div className="col-sm-2">Viaje Aereo</div>
                                    <div className="col-sm-2">Martes 15 de noviembre</div>
                                    <div className="col-sm-2">Viernes 18 de noviembre</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">Medellín</div>
                                    <div className="col-sm-2">San Andrés</div>
                                    <div className="col-sm-2">Viaje Marítimo</div>
                                    <div className="col-sm-2">Viernes 18 de noviembre</div>
                                    <div className="col-sm-2">Domingo 20 de noviembre</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card">
                        <div class="card-header" role="tab" id="headingTwo2">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseTwo21"
                                aria-expanded="false" aria-controls="collapseTwo21">
                                <h5 class="mb-0">
                                    Bogotá - Nueva York <i class="fas fa-angle-down rotate-icon"></i>
                                </h5>
                            </a>
                        </div>

                        <div id="collapseTwo21" class="collapse" role="tabpanel" aria-labelledby="headingTwo21" data-parent="#accordionEx1">
                            <div class="card-body">
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default User;