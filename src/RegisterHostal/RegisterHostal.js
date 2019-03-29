import React from "react"
/* Import Components */
import Input from "./Input";
import Button from "./Button";
import TextArea from "./TextArea";
import '../../src/css/Style.css';
import MainApp from "../App";
import ReactDOM from 'react-dom';


class App extends React.Component {

    render() {
        return (
            <div className="bgi">
                <div className="root-container">
                  <h1>MultiTravel</h1>
                  <div className="box-controller">
                        Registrar Servicio de Hospedaje
                  </div>
                <div className="box-container">
                     <RegisterHostal />
                </div>
              </div>
            </div>
            
        )
    }
}

class RegisterHostal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            newHostal: {
                nombre: "",
                descripcion: "",
                precio: "",
                telefono: "",
                sitioweb:"",
                ciudad: "",
                direccion: "",
                imagenes: ""                
            },            
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
          prevState => ({
            newHostal: {
              ...prevState.newHostal,
              [name]: value
            }
          }),
          () => console.log(this.state.newHostal)
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const url = "/hostales";
        const imgArray = this.state.newHostal.imagenes.split(",");
        let serviceData = this.state.newHostal;
        serviceData.imagenes = imgArray;     
    
        fetch(url, {
          method: "POST",
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

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            serviceType: "",
            newHostal: {                
              nombre: "",
              descripcion: "",
              precio: "",
              telefono: "",
              sitioweb:"",
              ciudad: "",
              direccion: "",
              imagenes:""    
            },
        });
    }

    render() {
        return (
          <form className="container-fluid" onSubmit={this.handleFormSubmit}>
            <Input
              inputType={"text"}
              name={"ciudad"}
              title={"Ubicación geografica por ciudad:"}
              value={this.state.newHostal.ciudad}
              placeholder={"Ingresa una ciudad"}
              handleChange={this.handleInput}
            />{" "}
            {/* ciudad */}
            <Input
              inputType={"text"}
              name={"nombre"}
              title={"Nombre del Hospedaje"}
              value={this.state.newHostal.nombre}
              placeholder={"Ingresa el nombre de tu hospedaje"}
              handleChange={this.handleInput}
            />{" "}
            {/* nombre */}
            <Input
              inputType={"text"}
              name={"precio"}
              title={"Precio por noche:"}
              value={this.state.newHostal.precio}
              placeholder={"Ingresa el precio por noche"}
              handleChange={this.handleInput}
            />{" "}
            {/* precio */}
            <Input
              inputType={"text"}
              name={"direccion"}
              title={"Direción:"}
              value={this.state.newHostal.direccion}
              placeholder={"Ingresa tu dirección"}
              handleChange={this.handleInput}
            />{" "}
            {/* direccion */}
            <Input
              inputType={"text"}
              name={"telefono"}
              title={"Teléfono:"}
              value={this.state.newHostal.telefono}
              placeholder={"Ingresa un telefono"}
              handleChange={this.handleInput}
            />{" "}
            {/* telefono */}
            <TextArea
              title={"Descripción:"}
              rows={10}
              value={this.state.newHostal.descripcion}
              name={"descripcion"}
              handleChange={this.handleInput}
              placeholder={"Describe tu servicio de hospedaje."}
            />{" "}
            {/* Descripcion */}
            <TextArea
              title={"Imagenes:"}
              rows={10}
              value={this.state.newHostal.imagenes}
              name={"imagenes"}
              handleChange={this.handleInput}
              placeholder={"Ingresa las urls de tus imagenes separadas por comas."}
            />{" "}
            {/* Imagenes */}
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

export default App;