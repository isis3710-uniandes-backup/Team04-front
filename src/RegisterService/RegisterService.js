import React from "react"
/* Import Components */
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import TextArea from "./TextArea";
import '../../src/css/Style.css'
import MainApp from "../App";
import ReactDOM from 'react-dom';
const SERVICIO_AEREO = "Servicio Aereo";
const SERVICIO_MARITIMO = "Servicio Maritimo";
const SERVICIO_TERRESTRE = "Servicio Terrestre";


class App extends React.Component {

    render() {
        return (
            <div className="bgi">
                <div className="root-container">
                  <h1>MultiTravel</h1>
                  <div className="box-controller">
                        Registrar Servicio de Transporte
                  </div>
                <div className="box-container">
                     <RegisterService />
                </div>
              </div>
            </div>
            
        )
    }
}

class RegisterService extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            serviceType: "",
            newService: {                
                origen: "",
                destino: "",
                ruta: ""
            },            
            serviceOptions: [SERVICIO_AEREO,SERVICIO_MARITIMO,SERVICIO_TERRESTRE]
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
        let servicio = this.state.serviceType
        let serviceData = this.state.newService;
        serviceData.ruta = this.state.newService.ruta.split(",");
        let url = "";
        if(servicio === SERVICIO_AEREO){
            url="/serviciosa";
        } else if (servicio === SERVICIO_MARITIMO){
            url="/serviciosm";
        } else if (servicio === SERVICIO_TERRESTRE){
            url="/serviciost";
        }
    
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
            newService: {                
                origen: "",
                destino: "",
                ruta: "",
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
            <TextArea
              title={"Ruta:"}
              rows={10}
              value={this.state.newService.ruta}
              name={"ruta"}
              handleChange={this.handleInput}
              placeholder={"Ingresa las rutas separadas por comas."}
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