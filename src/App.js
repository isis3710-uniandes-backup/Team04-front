import React, { Component } from 'react';
import './App.css';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import MainView from './MainView/MainView.js';


class App extends Component {
  renderMainView(){
    return (<MainView></MainView>)
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
    );
  }
}

export default App;
