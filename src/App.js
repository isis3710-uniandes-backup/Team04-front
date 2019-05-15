import React, { Component } from 'react';
import './App.css';
import MaterialIcon from 'material-icons-react';
import MainView from './MainView/MainView.js';

import ReactDOM from 'react-dom';

import Profile from './Profiles/UserProfile';
import EmpresaProfile from './Profiles/EmpresaProfile';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
import Auth from "./Auth";

const auth = new Auth();
let user = "";
class App extends Component {

  constructor(props) {
    super(props);
    if (typeof this.props.usuario !== 'undefined') {
      if (this.props.usuario.logueado) {
        user = this.props.usuario;
      }
    }
    this.state = {};
  }
  componentDidMount() {
    auth.handleAuthentication();
  }

  renderMainView() {
    return (<MainView usuario={user}></MainView>)
  }

  Profile(e) {
    let userLang = navigator.language || navigator.userLanguage

    function getLocale() {
      return userLang.startsWith("es") ? localeEsMessages : localeEnMessages;
    }

    if ( auth.isAuthenticated()) {
      
      ReactDOM.render(
        <IntlProvider locale={userLang} messages={getLocale()}>
          <Profile usuario={auth.getProfile()} />
        </IntlProvider>, document.getElementById("root"));
    } else if (user.tipo === "0" && auth.isAuthenticated()) {
      ReactDOM.render(
        <IntlProvider locale={userLang} messages={getLocale()}>
          <EmpresaProfile usuario={user} />
        </IntlProvider>, document.getElementById("root"));
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderMainView()}
        <nav className="navbar fixed-bottom navbar-light bg-light navbar-expand-lg" id="mainNavbar">
          <div className="container fluid">
            <div className="col">
              <a className="navbar-brand" href="/app" arial-label="MultiTravel">
                <img className="iconHome" src="./icons/mainIcon.png" alt="Home"></img>
              </a>
            </div>

            <div className="col">
              <a className="navbar-brand" onClick={this.Profile.bind(this)}>
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
    );
  }
}

export default App;
