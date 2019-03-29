import React from "react"
import Input from "./Input";
import Button from "./Button";
import TextArea from "./TextArea";
import ReactDOM from 'react-dom';
import MainApp from "../App";
import RegistrarHostal from "../RegisterHostal/RegisterHostal"
import RegistrarServicio from "../RegisterService/RegisterService"
import '../../src/css/Style.css';

import MaterialIcon, { colorPalette } from 'material-icons-react';

let serviciosA = [];
let serviciosM = [];
let serviciosT = [];
class EmpresaProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: true,
            idEmpresa: '',
            newEmpresa: {
                nombre: '',
                dueño: '',
                descripcion:  '',
                serviciosT:  [],
                serviciosM: [],
                serviciosA: [],
                viajes: ''
            }
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.agregarNuevoServicio = this.agregarNuevoServicio.bind(this);
        this.agregarNuevoHostal = this.agregarNuevoHostal.bind(this);
    }

    agregarNuevoServicio(e) {
        ReactDOM.render(<RegistrarServicio />, document.getElementById('root'));
    }

    agregarNuevoHostal(e) {
        ReactDOM.render(<RegistrarHostal />, document.getElementById('root'))
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
          prevState => ({
            newEmpresa: {
              ...prevState.newEmpresa,
              [name]: value
            }
          }),
          () => console.log(this.state.newEmpresa)
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const url = `/empresas/${this.state.idEmpresa}`;
        let serviceData = this.state.newEmpresa;  
    
        fetch(url, {
          method: "PUT",
          body: JSON.stringify(serviceData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }).then(response => {
          response.json().then(data => {
            ReactDOM.render(<MainApp />, document.getElementById('root'));
            console.log("Successful" + data);
          });
        });
    }

    componentDidMount() {
        let me = this;
        let encontrado = false;
        let idusuario = this.props.usuario.idUsuario;
        fetch('/empresas', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                for (let emp of body) {
                    if (emp.dueño === idusuario) {
                        encontrado = true;
                        serviciosA = emp.serviciosA;
                        serviciosT = emp.serviciosT;
                        serviciosM = emp.serviciosM;
                        me.setState({ 
                            response: false,
                            idEmpresa: emp.idEmpresa,
                            newEmpresa: {
                                nombre: emp.nombre,
                                dueño: emp.dueño,
                                descripcion:  emp.descripcion,
                                serviciosT:  emp.serviciosT,
                                serviciosM: emp.serviciosM,
                                serviciosA: emp.serviciosA,
                                viajes: emp.viajes
                            }
                        });
                    }
                } 
                return encontrado;
            }).then(function (existe){
                if(existe === false){
                    const empresaData ={
                        nombre: '',
                        dueño: idusuario,
                        descripcion:  '',
                        serviciosT:  [],
                        serviciosM: [],
                        serviciosA: [],
                        viajes: ''
                    }
                    fetch("/empresas", {
                        method: "POST",
                        body: JSON.stringify(empresaData),
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json"
                        }
                    }).then(response => {
                        response.json().then(emp => {
                            console.log("Successful" + emp);
                            me.setState({ 
                                response: false,
                                idEmpresa: emp.idEmpresa,
                                newEmpresa: {
                                    nombre: emp.nombre,
                                    dueño: emp.dueño,
                                    descripcion:  emp.descripcion,
                                    serviciosT:  emp.serviciosT,
                                    serviciosM: emp.serviciosM,
                                    serviciosA: emp.serviciosA,
                                    viajes: emp.viajes
                                }
                            });
                        });
                    });
                }
            });
    }

    render() {

        if (this.state.response) {
            return 'Loading...'
        }

        return (
            <div>
                <center>
                <div>
                    <nav className="navbar fixed-bottom navbar-light bg-light navbar-expand-lg" id="mainNavbar">
                        <div className="container fluid">
                            <div className="col">
                                <a className="navbar-brand" href="/app" arial-label="MultiTravel">
                                    <img className="iconHome" src="/icons/mainIcon.png" height="40px" width="60px" alt="Home"></img>
                                </a>
                            </div>

                            <div className="col">
                                <a className="navbar-brand" href="/app">
                                    <MaterialIcon icon="person" size={45} color='#272F32' alt="Profile"></MaterialIcon>
                                </a>
                            </div>
                            <div className="col">
                                <a className="navbar-brand" id="locationbutton" href="/app">
                                    <MaterialIcon icon="location_on" size={40} color='#272F32' alt="Locations"></MaterialIcon>
                                </a>
                            </div>
                        </div>
                    </nav>
                    
                </div>
                </center>
                <div className="content">
                    <div className="banner">
                        <img className="profile" src="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" height="233px" width="200px" alt="profile pic" />
                        <form className="container" onSubmit={this.handleFormSubmit}>
            <Input
              inputType={"text"}
              name={"nombre"}
              title={"Nombre:"}
              value={this.state.newEmpresa.nombre}
              placeholder={"Ingresa el nombre de tu empresa"}
              handleChange={this.handleInput}
            />{" "}
            {/* nombre */}
            <Button
              action={this.handleFormSubmit}
              type={"primary"}
              title={"Submit"}
              style={buttonStyle}
            />{" "}
            {/*Submit */}
            <Button
              action={this.agregarNuevoServicio}
              type={"primary"}
              title={"Agregar Servicio"}
              style={buttonStyle}
            />{" "}
            {/*Submit */}
            <Button
              action={this.agregarNuevoHostal}
              type={"primary"}
              title={"Agregar Hostal"}
              style={buttonStyle}
            />{" "}
            {/*Submit */}
            <TextArea
              title={"Descripción:"}
              rows={10}
              value={this.state.newEmpresa.descripcion}
              name={"descripcion"}
              handleChange={this.handleInput}
              placeholder={"Describe tu empresa."}
            />{" "}
            {/* Descripcion */}
          </form>
                    </div>
                </div>
            </div>
        )
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default EmpresaProfile;