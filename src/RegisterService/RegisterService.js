import React, { Component } from "react"
import ReactDOM from 'react-dom';
import "react-datepicker/dist/react-datepicker.css";
import '../../src/css/Style.css'
import MainApp from "../App";
/* Import Components */
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
const SERVICIO_AEREO = "Servicio Aereo";
const SERVICIO_MARITIMO = "Servicio Maritimo";
const SERVICIO_TERRESTRE = "Servicio Terrestre";


class RegisterService extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            serviceType: "",
            newService: {                
                origen: "",
                destino: "",
                ruta: [],
            },            
            serviceOptions: [SERVICIO_AEREO,SERVICIO_MARITIMO,SERVICIO_TERRESTRE]
        };
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
          prevState => ({
            newService: {
              ...prevState.newService,
              [name]: value
            }
          }),
          () => console.log(this.state.newService)
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const servicio = this.state.serviceType
        let url = "";
        if(servicio === SERVICIO_AEREO){
            url="localhost:3001/serviciosa";
        } else if (servicio === SERVICIO_MARITIMO){
            url="localhost:3001/serviciosm";
        } else if (servicio === SERVICIO_TERRESTRE){
            url="localhost:3001/serviciost";
        }
        let serviceData = this.state.newService;
    
        fetch(url, {
          method: "POST",
          body: JSON.stringify(serviceData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }).then(response => {
          response.json().then(data => {
            console.log("Successful" + data);
          });
        });
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            serviceType: "",
            newService: {                
                origen: "",
                destino: "",
                ruta: [],
            },
        });
    }

    render() {
        return (
          <form className="container-fluid" onSubmit={this.handleFormSubmit}>
            <Select
              title={"Tipo de servicio"}
              name={"serviceType"}
              options={this.state.serviceOptions}
              value={this.state.serviceType}
              placeholder={"Elige el tipo de servicio"}
              handleChange={this.handleInput}
            />{" "}
            {/* Tipo del servicio */}
            <Input
              inputType={"text"}
              name={"origen"}
              title={"Origen"}
              value={this.state.newService.origen}
              placeholder={"Ingresa una ciudad"}
              handleChange={this.handleInput}
            />{" "}
            {/* Origen */}
            <Input
              inputType={"text"}
              name={"destino"}
              title={"Destino"}
              value={this.state.newService.destino}
              placeholder={"Ingresa una ciudad"}
              handleChange={this.handleInput}
            />{" "}
            {/* Destino */}
            <Input
              inputType={"text"}
              name={"rute"}
              title={"Ruta"}
              value={this.state.newService.ruta}
              placeholder={"Agrega un camino"}
              handleChange={this.handleInput}
            />{" "}
            {/* Ruta */}
            <Button
              action={this.handleFormSubmit}
              type={"primary"}
              title={"Submit"}
              style={buttonStyle}
            />{" "}
            {/*Submit */}
            <Button
              action={this.handleClearForm}
              type={"secondary"}
              title={"Clear"}
              style={buttonStyle}
            />{" "}
            {/* Clear the form */}
          </form>
        );
      }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default RegisterService;