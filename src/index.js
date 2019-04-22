import React from 'react';
import ReactDOM from 'react-dom';
import './css/Style.css';
import './css/_timerSty.css';
<<<<<<< HEAD
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
=======
import App from './App.js';
import {IntlProvider, addLocaleData} from 'react-intl';

import esLocaleData from 'react-intl/locale-data/es';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

addLocaleData(esLocaleData);

let userLang = navigator.language || navigator.userLanguage

function getLocale(){
    return userLang.startsWith("es") ? localeEsMessages : localeEnMessages;
>>>>>>> origin/master
}

ReactDOM.render(
    <IntlProvider locale={userLang} messages= {getLocale()}>
<<<<<<< HEAD
        <App />
    </IntlProvider> , document.getElementById('root'));
=======
        <App/>
    </IntlProvider>, document.getElementById("root"));
>>>>>>> origin/master
