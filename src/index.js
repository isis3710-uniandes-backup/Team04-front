import React from 'react';
import ReactDOM from 'react-dom';
import './css/Style.css';
import './css/_timerSty.css';
import App from './App.js';
import {IntlProvider, addLocaleData} from 'react-intl';

import esLocaleData from 'react-intl/locale-data/es';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
import * as serviceWorker from './serviceWorker';


addLocaleData(esLocaleData);

let userLang = navigator.language || navigator.userLanguage

function getLocale(){
    return userLang.startsWith("es") ? localeEsMessages : localeEnMessages;
}

ReactDOM.render(
    <IntlProvider locale={userLang} messages= {getLocale()}>
        <App/>
    </IntlProvider>, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();