import React, { Component} from 'react';

class CardCollapse extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            idParent: 0
        }
    }

    setDataToState(){
        this.setState({
            id: this.props.id,
            idParent: this.props.idParent
        })
    }
    render(){
        return(
            <div className="card" id={"actividad" + this.state.id}>
                <div className="card-header" id={"headingActividad" + this.state.id}>
                    <h2 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseActividad" + this.state.id} aria-expanded="true" aria-controls={"collapseActividad"> + this.state.id}>
                            Carnaval Decembrino
                        </button>
                    </h2>
                </div>
                <div id={"collapseActividad" + this.state.id} className="collapse show" aria-labelledby={"headingActividad" + this.state.id} data-parent={this.state.idParent}>
                    <div className="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                </div>
            </div>
        )
    }
}

export default CardCollapse;