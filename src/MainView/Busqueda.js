import React,{ Component} from 'react';

class Busqueda extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var id = this.props.data.id;
        return(
            <div>
                <div className="card">
                    <div className="card-header" id={"heading" +id}>
                        <h2 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"collapse" + id} aria-expanded="true" aria-controls="collapse1">
                                Transporte
                            </button>
                        </h2>
                    </div>
                    <div id="collapse1" className="collpse show" aria-labelledby="heading1" data-parent="#accordionResultados">
                        <div className="card-body">
                            <TransportData></TransportData>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="heading2">
                        <h2 className="mb-0">
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                Alojamiento
                            </button>
                        </h2>
                    </div>
                    <div id="collapse2" className="collapse" aria-labelledby="heading2" data-parent="#accordionResultados">
                        <div className="card-body">
                            <HostalData></HostalData>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Busqueda;