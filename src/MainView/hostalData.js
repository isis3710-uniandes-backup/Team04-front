import React, { Component} from 'react';
import './HostalData.css';
import Stars from './Stars.js';
import MaterialIcon, {colorPalette} from 'material-icons-react';
class HostalData extends Component{
    constructor(props){
        super(props);
        this.state={
            name: ""
        }
    }
    render(){
        return(
            <div className="mainContainer">
            <div class="card mb-12">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img className="card-img" src="http://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_650,q_auto,w_1000/itemimages/40/10/4010756.jpeg" alt={this.state.name + " Main Image"} id="mainImage"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <label data-toggle="collapse" data-target="#extraDataCollapse" role="button" aria-expanded="false" aria-controls="extraDataCollapse">Nombre</label>
                                    <Stars></Stars>
                                    <label data-toggle="collapse" data-target="#extraDataCollapse" role="button" aria-expanded="false" aria-controls="extraDataCollapse">Ubicación</label>
                                    <div>
                                    <a data-toggle="collapse" data-target="#extraDataCollapse" role="button" aria-expanded="false" aria-controls="extraDataCollapse">
                                        <MaterialIcon icon="location_on"></MaterialIcon>
                                        <label>Cartagena, a 0,5 Kilometros del aeropuerto</label>
                                    </a>
                                </div>
                                </div>
                                <div className="col ">
                                    <label>Mejor precio:</label>
                                    <label>200000$</label>
                                    <label>Tipo Transporte:</label>
                                    <label>Terrestre</label>
                                </div>
                                <div className="col">
                                    <label>Otras opciones:</label>
                                    
                                        <div className="list-group">
                                            <button type="button" className="list-group-item list-group-item-action">Bogotá - Cartagena : Avión</button>
                                        </div>
                                        <br></br>
                                    <button type="button" className="btn btn-primary" >Agregar</button>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
             <div className="row collapse" id="extraDataCollapse">
                <div className="card mb-12">
                    <div className="row no-gutters">
                        
                    </div>
                </div>
                <div className="col">
                    <ul class="nav nav-tabs" id="extraDataTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="information-tab" data-toggle="tab" href="#information" role="tab" aria-controls="information" aria-selected="true">Información</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="imagenes-tab" data-toggle="tab" href="#imagenes" role="tab" aria-controls="imagenes" aria-selected="false">Imagenes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="opciones-tab" data-toggle="tab" href="#opciones" role="tab" aria-controls="opciones" aria-selected="false">Opiniones</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="ofertas-tab" data-toggle="tab" href="#ofertas" role="tab" aria-controls="ofertas" aria-selected="false">Ofertas</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="information" role="tabpanel" aria-labelledby="information-tab">
                            <div className="row">
                                <div className="col-4">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.3671021232103!2d-75.48493448468737!3d10.392389892582822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625cb6649c1af%3A0xc2bfbac2309ea48a!2sHotel+Ibiza!5e0!3m2!1ses-419!2sco!4v1553637222477" frameborder="0" allowfullscreen>
                                    </iframe>
                                </div>
                                <div className="col">
                                    <label>Servicios y actividades cercanas</label>
                                    <div class="accordion" id="accordionActividades">
                                        <div class="card">
                                            <div class="card-header" id="headingOne">
                                                <h2 class="mb-0">
                                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Carnaval Decembrino
                                                    </button>
                                                </h2>
                                            </div>
                                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionActividades">
                                                <div class="card-body">
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-header" id="headingTwo">
                                                <h2 class="mb-0">
                                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Collapsible Group Item #2
                                                    </button>
                                                </h2>
                                            </div>
                                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionActividades">
                                                <div class="card-body">
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-header" id="headingThree">
                                                <h2 class="mb-0">
                                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Collapsible Group Item #3
                                                    </button>
                                                </h2>
                                            </div>
                                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionActividades">
                                                <div class="card-body">
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="tab-pane fade" id="imagenes" role="tabpanel" aria-labelledby="imagenes-tab">
                            <div id="extraDataCarouselmagenes" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#extraDataCarouselmagenes" data-slide-to="0" class="active"></li>
                                    <li data-target="#extraDataCarouselmagenes" data-slide-to="1"></li>
                                    <li data-target="#extraDataCarouselmagenes" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner container">
                                    <div class="carousel-item active">
                                        <img className="carouselImage d-block" src="//imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_650,q_auto,w_1000/itemimages/59/75/5975238.jpeg" alt="image"/>
                                    </div>
                                    <div class="carousel-item">
                                        <img className="carouselImage d-block" src="//imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_470,q_auto,w_805/partnerimages/27/99/279942284.jpeg" alt="image"/>
                                    </div>
                                    <div class="carousel-item">
                                        <img className="carouselImage d-block" src="//imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_470,q_auto,w_805/partnerimages/27/99/279942242.jpeg" alt="image"/>
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#extraDataCarouselmagenes" role="button" data-slide="prev">
                                    <MaterialIcon icon="keyboard_arrow_left" color="#272F32" size={30}></MaterialIcon>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#extraDataCarouselmagenes" role="button" data-slide="next">
                                    {/* <span class="carousel-control-next-icon" aria-hidden="true"></span> */}
                                    <MaterialIcon icon="keyboard_arrow_right" color="#272F32" size={30}></MaterialIcon>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="opciones" role="tabpanel" aria-labelledby="opciones-tab">
                            <div className="card mb-12">
                                <div className="row no-grutters">
                                    <div className="col-md-4">
                                            <div class="card">
                                                <div class="jumbotron card-img-top">
                                                    <h1 class="display-4 text-center">8.5</h1>
                                                </div>
                                                <div className="card-body">
                                                    <label class="lead">Puntuación basada en 45 usuarios</label>
                                                </div>
                                            </div>
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <h2 className="display-4">10</h2>
                                                        <label>Viajero</label> <br></br>
                                                        <label>Fecha opinión:</label> <br></br>
                                                        <label>11 Agosto 2018</label> <br></br>
                                                        <label>Fecha Estadia</label> <br></br>
                                                        <label>Agosto 2018</label>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <label>Muy bien ubicado, pequeño pero acogedor.</label>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="tab-pane fade" id="ofertas" role="tabpanel" aria-labelledby="ofertas-tab">
                                <div className="card mb-12">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="row no-grutters">
                                                <div className="col-md-2"> 
                                                    <img src="//ie1.trivago.com/images/partnerlogos/452_mx_co.png"></img>
                                                </div>
                                                <div className="col-md-8">
                                                    <div>Habitación doble</div> <br></br>
                                                    <div>Desayuno Gratis</div>
                                                </div>
                                                <div className="col-md-2">
                                                    <label>$135.980</label>
                                                    <span class="slideout-deal__quantifier">/noche</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HostalData;