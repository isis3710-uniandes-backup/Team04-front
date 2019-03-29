import React, { Component} from 'react';
import './hostalData.css';
import Stars from './Stars.js';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import CardCollapse from './CardCollapse';
import { cpus } from 'os';
class HostalData extends Component{
    //TODO los comentarios no se van a renderizar porque no están tan elaborados, solo se mostrará la puntuación
    constructor(props){
        super(props);
        this.state={
            comentarios: [],
            ciudad: '',
            descripcion: '',
            direccion: '',
            id: 0,
            imagenes: [],
            nombre: '',
            precio: 0,
            puntuacion: '',
            sitioWeb: '',
            telefono: '',
            //actividades: []
        }
        
        this.setDataToState = this.setDataToState
        this.renderActividades = this.renderActividades.bind(this);
        this.renderComentarios = this.renderComentarios.bind(this);
        this.renderCarouselItem = this.renderCarouselItem.bind(this);
        this.renderCarouselIndicators = this.renderCarouselIndicators.bind(this);
        //TODO puede que falten declaraciones de métodos en el constructos
    }
    
    setDataToState(){
       
        
        
    }

    componentDidMount(){
        var hostalData = this.props.data;
        this.setState({
            id: this.props.id,
            nombre: hostalData.nombre,
            descripcion: hostalData.descripcion,
            precio: hostalData.precio,
            telefono: hostalData.telefono,
            sitioWeb: hostalData.sitioWeb,
            ciudad: hostalData.ciudad,
            direccion: hostalData.direccion,
            puntuacion: hostalData.puntuacion,
            imagenes: hostalData.imagenes,
           // actividades: hostalData.actividades,
            comentarios: hostalData.comentarios
        })
    }
    renderActividades(idParent){
        return this.state.actividades.map((actividad, i) =>{
            return(<CardCollapse id={i++} key={i++} idParent={idParent} data={actividad}></CardCollapse>)
        })
    }

    //TODO terminar de renderizar los comentarios
    renderComentarios(){
        var valoracionPromedio = 0;
        for(var comment in this.state.comentarios){
            valoracionPromedio  += comment.valor;
        }
        valoracionPromedio /= this.state.comentarios.length;
        return this.state.comentarios.map((comentario,i) =>{
            return(
                <div className="card mb-12">
                    <div className="row no-grutters">
                        <div className="col-md-4">
                                <div className="card">
                                    <div className="jumbotron card-img-top">
                                        <h1 className="display-4 text-center">8.5</h1>
                                    </div>
                                    <div className="card-body">
                                        <label className="lead">Puntuación basada en 45 usuarios</label>
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
            )
        })
    }

    renderCarouselItem(){
        return this.state.imagenes.map((imagen, i) =>{
            if(i == 1){
                return(
                    <div className={"carousel-item active"}>
                    <img className="carouselImage d-block" src={imagen} alt="image"/>
                </div>
                )
            }
            return (
                <div className={"carousel-item"}>
                    <img className="carouselImage d-block" src={imagen} alt="image"/>
                </div>
            )
        })
    }

    renderCarouselIndicators(){
        var indicators = this.state.imagenes.slice(0,this.state.imagenes.length-1);
        return indicators.map(i =>{
            if(i == 1){
                return (<li data-target={"#extraDataCarouselmagenes"+ this.state.id}  className="active" data-slide-to={(i++)-1}></li>)
            }
            return (<li  data-target= {"#extraDataCarouselmagenes"+ this.state.id} data-slide-to={(i++)-1}></li>)
        })
    }
    render

    render(){
        //TODO agregar las actividades de forma correcta. -- Render en linea 114 --
        this.setDataToState();
        return(
        <div className="mainContainer" id ={this.state.id}>
            <div className="card mb-12">
                <div className="row no-gutters">
                    <div className="col-md-4">
                    {console.log(this.state.imagenes)}
                        <img className="card-img" src={this.state.imagenes[0]} alt={this.state.nombre + " Main Image"} id={"mainImage" + this.state.id}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <label data-toggle="collapse" data-target={"#extraDataCollapse" + this.state.id} role="button" aria-expanded="false" aria-controls={"extraDataCollapse"+ this.state.id}>Nombre</label>
                                    <Stars id={"starsHostalData" + this.state.id}></Stars>
                                    <label data-toggle="collapse" data-target={"#extraDataCollapse" + this.state.id} role="button" aria-expanded="false" aria-controls={"extraDataCollapse"+ this.state.id}>Ubicación</label>
                                    <div>
                                    <a data-toggle="collapse" data-target={"#extraDataCollapse" + this.state.id} role="button" aria-expanded="false" aria-controls={"extraDataCollapse"+ this.state.id}>
                                        <MaterialIcon icon="location_on"></MaterialIcon>
                                        <label>Cartagena, a 0,5 Kilometros del aeropuerto</label>
                                    </a>
                                </div>
                                </div>
                                <div className="col ">
                                    <label>Precio:</label>
                                    <label>{this.state.precio}</label>
                                    {/* <label>Tipo Transporte:</label>
                                    <label>{this.state.tipo}</label> */}
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
             <div className="row collapse" id={"extraDataCollapse"+ this.state.id}>
                {/* <div className="card mb-12">
                    <div className="row no-gutters">
                        
                    </div>
                </div> */}
                <div className="col">
                    <ul className="nav nav-tabs" id={"extraDataTab" + this.state.id} role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id={"information-tab" + this.state.id} data-toggle="tab" href={"#information" + this.state.id} role="tab" aria-controls={"information" + this.state.id} aria-selected="true">Información</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id={"imagenes-tab"+ this.state.id} data-toggle="tab" href={"#imagenes" + this.state.id} role="tab" aria-controls={"imagenes" + this.state.id}aria-selected="false">Imagenes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="opciones-tab" data-toggle="tab" href="#opciones" role="tab" aria-controls="opciones" aria-selected="false">Puntuación</a>
                        </li>

                        {/* <li className="nav-item">
                            <a className="nav-link" id="ofertas-tab" data-toggle="tab" href="#ofertas" role="tab" aria-controls="ofertas" aria-selected="false">Ofertas</a>
                        </li> */}
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id={"information" + this.state.id} role="tabpanel" aria-labelledby={"information-tab" + this.state.id}>
                            <div className="row">
                                <div className="col-4">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.3671021232103!2d-75.48493448468737!3d10.392389892582822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625cb6649c1af%3A0xc2bfbac2309ea48a!2sHotel+Ibiza!5e0!3m2!1ses-419!2sco!4v1553637222477" frameborder="0" allowfullscreen>
                                    </iframe>
                                </div>
                                <div className="col">
                                    <label>Servicios y actividades cercanas</label>
                                    <div className="accordion" id={"accordionActividades" + this.state.id}>
                                    {/** Creo que algo malo estoy haciendo llamando de esta forma los renders. Creo que debería simplemente llamar al arreglo
                                        Al igual creo que así puede funcionar. Así se está renderizando MainView dentro de App
                                    */}
                                        {/*this.renderActividades("accordionActividades" + this.state.id)*/}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="tab-pane fade" id={"imagenes" + this.state.id} role="tabpanel" aria-labelledby={"imagenes-tab"+ this.state.id}>
                            <div id={"extraDataCarouselmagenes"+ this.state.id} className="carousel slide" data-ride="carousel">
                             {/**Pasar esto a componente para que se haga solo por cada foto que haya para eso es CarouselIndicators y CarouselItem*/}
                             <ol className="carousel-indicators">
                                    {this.renderCarouselIndicators()}
                             </ol>
                                    {/* <li data-target={"#extraDataCarouselmagenes"+ this.state.id} data-slide-to="0" className="active"></li>
                                    <li data-target={"#extraDataCarouselmagenes"+ this.state.id} data-slide-to="1"></li>
                                    <li data-target={"#extraDataCarouselmagenes"+ this.state.id} data-slide-to="2"></li> */}

                                {/* <div className="carousel-inner container">
                                    <div className="carousel-item active">
                                        <img className="carouselImage d-block" src="//imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_650,q_auto,w_1000/itemimages/59/75/5975238.jpeg" alt="image"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img className="carouselImage d-block" src="//imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_470,q_auto,w_805/partnerimages/27/99/279942284.jpeg" alt="image"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img className="carouselImage d-block" src="//imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_470,q_auto,w_805/partnerimages/27/99/279942242.jpeg" alt="image"/>
                                    </div>
                                </div> */}
                                <div className="carousel-inner container">
                                    {this.renderCarouselItem()}
                                </div>
                                
                                <a className="carousel-control-prev" href={"#extraDataCarouselmagenes"+ this.state.id} role="button" data-slide="prev">
                                    <MaterialIcon icon="keyboard_arrow_left" color="#272F32" size={30}></MaterialIcon>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href={"#extraDataCarouselmagenes"+ this.state.id} role="button" data-slide="next">
                                    <MaterialIcon icon="keyboard_arrow_right" color="#272F32" size={30}></MaterialIcon>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="opciones" role="tabpanel" aria-labelledby="opciones-tab">
                            {/* Aquí van los comentarios cuando estén más elaborados */}
                            <label>{this.state.puntuacion}</label>
                        </div>
                        {/**Aquí van las ofertas cuando estén bien elaboradas. Por el momento no hay nada que las represente */}
                            {/* <div className="tab-pane fade" id="ofertas" role="tabpanel" aria-labelledby="ofertas-tab">
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
                                                    <span className="slideout-deal__quantifier">/noche</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HostalData;