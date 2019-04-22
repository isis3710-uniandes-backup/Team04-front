import React from 'react';
import ReactDOM from 'react-dom';
import './css/Style.css';
import './css/_timerSty.css';
import App from './App.js'
import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

addLocaleData(esLocaleData);

let userLang = navigator.language || navigator.userLanguage
console.log(userLang);

function getLocale(){
    return userLang.startsWith('es') ? localeEsMessages : localeEnMessages;
}

ReactDOM.render(
    <IntlProvider locale={userLang} messages= {getLocale()}>
        <App />
    </IntlProvider> , document.getElementById('root'));
