import React,{ Component} from 'react';
import TransportData from './TransportData';
import HostalData from './HostalData.js';
class Busqueda extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var id = this.props.id;
        var transporte = this.props.data.transporte;
        var alojamiento = this.props.data.alojamiento;
        return(
            <div>
                <div className="card">
                    <div className="card-header" id={"headingTransporte" +id}>
                        <h2 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"collapse" + id} aria-expanded="true" aria-controls={"collapse"+id}>
                                Transporte
                            </button>
                        </h2>
                    </div>
                    <div id={"collapse"+id} className="collpse show" aria-labelledby={"headingTransporte"+id} data-parent="#accordionResultados">
                        <div className="card-body">
                            <TransportData id={"transportData"+id} data={transporte}></TransportData>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id={"headingHostal"+ id}>
                        <h2 className="mb-0">
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={"#collapse"+ id} aria-expanded="false" aria-controls={"collapse"+ id}>
                                Alojamiento
                            </button>
                        </h2>
                    </div>
                    <div id={"collapse" +id} className="collapse" aria-labelledby={"headingHostal"+ id} data-parent="#accordionResultados">
                        <div className="card-body">
                            <HostalData id={"hostalData"+ id} data={alojamiento}></HostalData>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Busqueda;