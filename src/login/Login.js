import React from "react"
import DatePicker from "react-datepicker";
import ReactDOM from 'react-dom';
import "react-datepicker/dist/react-datepicker.css";
import User from "../../src/Profiles/UserProfile"

import '../../src/css/Style.css'
import MainApp from "../App";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoginOpen: true, isRegisterOpen: false };
    }

    showLoginBox() {
        this.setState({ isLoginOpen: true, isRegisterOpen: false })
    }

    showRegisterBox() {
        this.setState({ isRegisterOpen: true, isLoginOpen: false })
    }

    render() {
        return (
            <div className="bgi">
                <div className="root-container">
                <h1>MultiTravel</h1>
                <div className="box-controller">
                    <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} onClick={this.showLoginBox.bind(this)}>
                        Login
                    </div>
                    <div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")} onClick={this.showRegisterBox.bind(this)}>
                        Register
                    </div>
                </div>

                <div className="box-container">

                    {this.state.isLoginOpen && <LoginBox />}
                    {this.state.isRegisterOpen && <RegisterBox />}
                </div>

            </div>
            </div>
            
        )
    }
}

class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: [],
        };
    }

    showValidationError(elm, msg) {
        this.setState((prevState) => ({ errors: [...prevState.errors, { elm, msg }] }));
    }

    clearValidationError(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return { errors: newArr };

        })

    }

    onUsernameChanged(e) {
        this.setState({ username: e.target.value });
        this.clearValidationError("username");
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
        this.clearValidationError("password");
    }


    submitLogin(e) {
        if (this.state.username === "") {
            this.showValidationError("username", "Username cannot be empty");
        } if (this.state.password === "") {
            this.showValidationError("password", "Password cannot be empty");
        }
        else {
            let usuario = this.state.username;
            let pass = this.state.password;
            let actualUser = {
                username: usuario,
                nombres: "",
                nacionalidad: "",
                fechaNacimiento: new Date(),
                password: pass,
                idUsuario: "",
                type: "",
                logueado: true
            };
            fetch('/users', {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            })

                .then(function (response) {
                    return response.json()
                }).then(function (body) {
                    for (let user of body) {
                        if (user.usuario === usuario && user.contrasenia === pass) {
                            actualUser.nombres = user.nombres;
                            actualUser.nacionalidad = user.nacionalidad;
                            actualUser.fechaNacimiento = user.fechaNacimiento;
                            actualUser.idUsuario = user.id;
                            actualUser.correo = user.correo;
                            ReactDOM.render(<MainApp usuario={actualUser} />, document.getElementById('root'));
                            console.log("LOGIN EXITOSO");
                        }
                    }
                });
        }

    }

    render() {

        let usernameErr = null, passwordErr = null;

        for (let err of this.state.errors) {
            if (err.elm === "username") {
                usernameErr = err.msg;
            } if (err.elm === "password") {
                passwordErr = err.msg;
            }
        }

        return (

            <div className="inner-container">
                <div className="box">
                    <div className="header">
                        Login
                </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="login-input" placeholder="Username" onChange={this.onUsernameChanged.bind(this)} />
                        <small className="danger-error">{usernameErr ? usernameErr : ""}</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.onPasswordChanged.bind(this)} />
                        <small className="danger-error">{passwordErr ? passwordErr : ""}</small>
                    </div>

                    <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)}>Login</button>


                </div>
            </div>
        );
    }

}

class RegisterBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            nombres: "",
            nacionalidad: "",
            correo: "",
            nacimiento: new Date(),
            password: "",
            type: "",
            errors: [],
            pwdState: null,
            registerState: null
        };
    }

    showValidationError(elm, msg) {
        this.setState((prevState) => ({ errors: [...prevState.errors, { elm, msg }] }));
    }

    clearValidationError(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return { errors: newArr };
        })

    }

    onUsernameChanged(e) {
        this.setState({ username: e.target.value });
        this.clearValidationError("username");
    }

    onNameChanged(e) {
        this.setState({ nombres: e.target.value });
    }

    onNacionalidadChanged(e) {
        this.setState({ nacionalidad: e.target.value });
    }

    onCorreoChange(e) {
        this.setState({ correo: e.target.value });
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
        this.clearValidationError("password");

        this.setState({ pwdState: "weak" });
        if (e.target.value.length > 8) {
            this.setState({ pwdState: "strong" });
        } else if (e.target.value.length > 6) {
            this.setState({ pwdState: "medium" });
        }
    }

    onTypeChanged(e) {
        this.setState({ type: e.target.value });
        this.clearValidationError("type");
    }

    handleChange(date) {
        this.setState({
            nacimiento: date
        });
    }

    submitRegister(e) {
        if (this.state.username === "") {
            this.showValidationError("username", "Username cannot be empty");
        } if (this.state.password === "") {
            this.showValidationError("password", "Password cannot be empty");
        }
        else {
            let register = this;
            let dia = this.state.nacimiento.getDate();
            let month = this.state.nacimiento.getMonth();
            let year = this.state.nacimiento.getFullYear();
            let dateString = dia + "-" +(month + 1) + "-" + year;
            fetch('/users', {
                method: 'POST',
                body: JSON.stringify({
                    nombres: this.state.nombres,
                    apellidos: this.state.nombres,
                    nacionalidad: this.state.nacionalidad,
                    correo: this.state.correo,
                    fechaNacimiento: dateString,
                    username: this.state.username,
                    password: this.state.password,
                }),
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) {
                    register.setState({ registerState: response.statusText });
                    return response.json()
                }).then(function (body) {
                    body.logueado = true;
                    ReactDOM.render(<MainApp usuario={body} />, document.getElementById('root'));
                    console.log("LOGIN EXITOSO");
                });
        }
    }

    render() {

        let usernameErr = null, passwordErr = null;

        for (let err of this.state.errors) {
            if (err.elm === "username") {
                usernameErr = err.msg;
            } if (err.elm === "password") {
                passwordErr = err.msg;
            }
        }

        let pwdWeak = false, pwdMedium = false, pwdStrong = false, formConfimation = false;

        if (this.state.registerState === "Created") {
            formConfimation = "Usuario registrado correctamente!!"
        }

        if (this.state.pwdState === "weak") {
            pwdWeak = true;
        } else if (this.state.pwdState === "medium") {
            pwdWeak = true;
            pwdMedium = true;
        } else if (this.state.pwdState === "strong") {
            pwdWeak = true;
            pwdMedium = true;
            pwdStrong = true;
        }

        return (
            <div className="inner-container">
                <div className="box">
                    <div className="header">
                        Register
                </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="login-input" placeholder="Username" onChange={this.onUsernameChanged.bind(this)} />
                        <small className="danger-error">{usernameErr ? usernameErr : ""}</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="nombres">Nombre Completo</label>
                        <input type="text" name="nombres" className="login-input" placeholder="Nombres" onChange={this.onNameChanged.bind(this)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="nacionalidad">Nacionalidad</label>
                        <input type="text" name="nacionalidad" className="login-input" placeholder="Nacionalidad" onChange={this.onNacionalidadChanged.bind(this)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="nacionalidad">Correo</label>
                        <input type="text" name="correo" className="login-input" placeholder="Correo" onChange={this.onCorreoChange.bind(this)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.onPasswordChanged.bind(this)} />
                        <small className="danger-error">{passwordErr ? passwordErr : ""}</small>

                        {this.state.password && <div className="password-state">
                            <div className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}></div>
                            <div className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}></div>
                            <div className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}></div>
                        </div>}

                    </div>

                    <label htmlFor="type">Tipo de usuario</label>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" id="empresatype" name="materialExampleRadios" onChange={this.onTypeChanged.bind(this)} />
                        <label className="form-check-label" htmlFor="empresatype">Empresa</label>
                    </div>

                    <div className="form-check">
                        <input type="radio" className="form-check-input" id="empresatype" name="materialExampleRadios" checked onChange={this.onTypeChanged.bind(this)} />
                        <label className="form-check-label" htmlFor="empresatype">Usuario Regular</label>
                    </div>


                    <div className="datepicker">
                        <label htmlFor="type">Fecha de Nacimiento:&nbsp; </label>
                        <DatePicker
                            selected={this.state.nacimiento}
                            onChange={this.handleChange.bind(this)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </div>

                    <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
                    <small className="confirmation">{formConfimation ? formConfimation : ""}</small>


                </div>
            </div>
        );
    }

}

export default App;