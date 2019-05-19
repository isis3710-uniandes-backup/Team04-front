import React, {Component} from 'react';
import * as d3 from 'd3';
import { nearer } from 'q';
export default class DataShowModel extends Component{

    state = {
        categorizar: this.props.selectedOption,
        network: this.props.network,
        linksSel: null,
        nodesSel: null
    }

    componentWillReceiveProps(){
        this.setState({
            categorizar: this.props.selectedOption
        })
        this.graphElements();
    }
    componentDidMount = () =>{
        
        
            this.graphElements();
    };
    
    

        render(){
            return(
                <div style={this.props.style}>
                        <div className="modal-content" id="innerContainer" style={this.props.style}>
                            {console.log("categoria aux", this.state.categorizar)}
                        </div>
                </div>
            )
        }
        
}
