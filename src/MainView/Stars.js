import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import localeEsMessages from "../locales/es";
import localeEnMessages from "../locales/en";
import './Stars.css';
import { FormattedMessage } from 'react-intl';

class Stars extends Component{

    render(){
        let i = Math.random() * (5 - 1) + 1;
        return(
        <div className="text-left">
<<<<<<< HEAD
                <label id="buscarSalida"><FormattedMessage id="NumeroEstrellas" /></label>
=======
                <label id="buscarSalida"><FormattedMessage id="NumEstrellas" /></label>
>>>>>>> origin/master

                <div className="starrating risingstar d-flex">
                    <input type="radio" id={"star1"+i} name="rating" value="1"/>
                    <label htmlFor={"star1"+i} title="1 star"></label>
                    <input type="radio" id={"star2"+i} name="rating" value="2"/>
                    <label htmlFor={"star2"+i} title="2 star"></label>
                    <input type="radio" id={"star3"+i} name="rating" value="3"/>
                    <label htmlFor={"star3"+i} title="3 star"></label>
                    <input type="radio" id={"star4"+i} name="rating" value="4"/>
                    <label htmlFor={"star4"+i} title="4 star"></label>
                    <input type="radio" id={"star5"+i} name="rating" value="5"/>
                    <label htmlFor={"star5"+i} title="5 star"></label>
                </div>
            
            </div>
        )
    }
}
export default Stars;