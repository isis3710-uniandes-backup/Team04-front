import React,{ Component} from 'react';
import TransportData from './TransportData';
import HostalData from './HostalData.js';
class Busqueda extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: 0,
            transporte: '',
            alojamiento: ''
        }
        this.setDataToState = this.setDataToState.bind(this);
    }

    setDataToState(){
        this.setState({
            id: this.props.id,
            transporte: this.props.data.transporte,
            alojamiento: this.props.data.alojamiento
        })
    }
    render(){
        this.setDataToState();
        return(
            <div>
                <div className="card">
                    <div className="card-header" id={"headingTransporte" +this.state.id}>
                        <h2 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"collapse" + this.state.id} aria-expanded="true" aria-controls={"collapse"+this.state.id}>
                                Transporte
                            </button>
                        </h2>
                    </div>
                    <div id={"collapse"+this.state.id} className="collpse show" aria-labelledby={"headingTransporte"+this.state.id} data-parent="#accordionResultados">
                        <div className="card-body">
                            <TransportData id={"transportData"+this.state.id} data={this.state.transporte}></TransportData>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id={"headingHostal"+ this.state.id}>
                        <h2 className="mb-0">
                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={"#collapse"+ this.state.id} aria-expanded="false" aria-controls={"collapse"+ this.state.id}>
                                Alojamiento
                            </button>
                        </h2>
                    </div>
                    <div id={"collapse" +this.state.id} className="collapse" aria-labelledby={"headingHostal"+ this.state.id} data-parent="#accordionResultados">
                        <div className="card-body">
                            <HostalData id={"hostalData"+ this.state.id} data={this.state.alojamiento}></HostalData>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Busqueda;