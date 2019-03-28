import React, { Component } from 'react';
import './Stars.css';

class Stars extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
        <div className="text-left">
                <label id="buscarSalida">Número de estrellas:</label>

                <div className="starrating risingstar d-flex">
                    <input type="radio" id="star1" name="rating" value="1"/>
                    <label htmlFor="star1" title="1 star"></label>
                    <input type="radio" id="star2" name="rating" value="2"/>
                    <label htmlFor="star2" title="2 star"></label>
                    <input type="radio" id="star3" name="rating" value="3"/>
                    <label htmlFor="star3" title="3 star"></label>
                    <input type="radio" id="star4" name="rating" value="4"/>
                    <label htmlFor="star4" title="4 star"></label>
                    <input type="radio" id="star5" name="rating" value="5"/>
                    <label htmlFor="star5" title="5 star"></label>
                    
                    
                    
                    
                </div>
            
            </div>
        )
    }
}
export default Stars;