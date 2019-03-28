import React, { Component} from 'react';
import './TransportData.css';

class TransportData extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div className="card mb-12">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <label className="card-img">Imagen Empresa</label>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <label>Información empresa</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TransportData