import React, {Component} from 'react';
import AuxiliarData from './AuxiliarData'
import * as d3 from 'd3';
import { ftruncate } from 'fs';
export default class DataShowModel extends Component{

    state = {
        categorizar: "user",
        network: null,
        linksSel: null,
        nodesSel: null
    }

    handleOptionChange = (changeEvent) => {
        console.log("onHandleOptionChange");
        let context = this;
        let promise = new Promise(function(resolve,reject){
            context.setState({
                categorizar: changeEvent.target.value
            })
            resolve(context)
        })

        promise.then(function(context2){
            context2.graphElements();
        })
        
    }
    componentDidMount= () => {
        let url= "/datosHistoricos";
        var misCabeceras = new Headers();
        var miInit = {
            headers: misCabeceras,
            method: 'GET',
            mode: 'cors'
        }
        let context = this;
        fetch(url, miInit)
        .then(function(response){
           return response.json();
        })
        .then(function(response){
            let n = Object.keys(response).length;
            let promiseNodes = new Promise(function(resolve, reject){
                const network = {
                    nodes: response.map(dato =>({
                        location: dato.location,
                        tipoViaje: dato.tipoViaje,
                        empresa: dato.empresa,
                        userID: dato.userID
                    }))
                    ,
                    links: d3.range(n*1).map( (i) => ({
                        source: i%n,
                        target: Math.floor(Math.random()*n)
                    }))
                }
                resolve(network);
            });
            promiseNodes.then(function(network){
                context.setState({
                    network: network
                })

                var svgWidth  = document.getElementById('innerContainer').offsetWidth, svgHeight = document.getElementById('innerContainer').offsetHeight;
                let r = 5;
                
                const c = d3.scaleOrdinal(d3.schemePastel1)
                            .domain(d3.set(network.nodes.map(d=>d.userID)).values()
                            .sort((a,b) => d3.ascending(a, b)));
        
                var svg = d3.select('#innerContainer')
                            .append('svg')
                            .attr('width', svgWidth)
                            .attr('height', svgHeight)
                            .style('border', 200);
        
                let linksSel = svg.selectAll('.link')
                                .data(network.links)
                                .enter()
                                .append('line')
                                .attr('class', 'link')
                                .attr('stroke-width', 0)
        
                let nodesSel = svg.selectAll('.node')
                                .data(network.nodes)
                                .enter()
                                .append('circle')
                                .attr('class', 'node')
                                .attr('r', r)
                                .style('fill',d => c(d.userID))
                context.setState({
                    linksSel: linksSel,
                    nodesSel: nodesSel
                })
                if(context.state.network != null ){
                    context.graphElements();
                }
                
            });
        })
    }

    graphElements = () =>{
        var svgWidth  = document.getElementById('innerContainer').offsetWidth, svgHeight = document.getElementById('innerContainer').offsetHeight;
        let r = 12;
        const c = d3.scaleOrdinal(d3.schemePastel1)
                    .domain(d3.set(this.state.network.nodes.map(d=>d.userID)).values()
                    .sort((a,b) => d3.ascending(a, b)));

        let categoriaPorUsuario = d3.scalePoint()
                        .domain(d3.set(this.state.network.nodes.map(d=>d.userID)).values()
                        .sort((a,b) => d3.ascending(a, b)))
                        .range([420, svgWidth - 420])


        let categoriaPorEmpresa = d3.scalePoint()
                    .domain(d3.set(this.state.network.nodes.map(d=>d.empresa)).values()
                    .sort((a,b) => d3.ascending(a, b)))
                    .range([420, svgWidth - 420])


        let categoriaPorLocalizacion =  d3.scalePoint()
                                        .domain(d3.set(this.state.network.nodes.map(d=>d.location)).values()
                                        .sort((a,b) => d3.ascending(a, b)))
                                        .range([420, svgWidth - 420])

        let categoriaPorTipo =  d3.scalePoint()
                            .domain(d3.set(this.state.network.nodes.map(d=>d.tipoViaje)).values()
                            .sort((a,b) => d3.ascending(a, b)))
                            .range([420, svgWidth - 420])

        let ticked = () => {
            this.state.nodesSel
            .attr("cx",d => {
                    return d.x
                })
            .attr("cy", d => {
                return d.y
                });

            this.state.linksSel
                .attr("x1", l=> l.source.x)
                .attr("y1", l=> l.source.y)
                .attr("x2", l=> l.target.x)
                .attr("y2", l=> l.target.y)
                .style("stroke", l => c(l.source.userID))
        }
                            
        let simulation = d3.forceSimulation(this.state.network.nodes)
                        .force("links", d3.forceLink(this.state.network.links).strength(0.0000001))
                        .force("x", d3.forceX(d => {
                                if(this.state.categorizar == "empresa"){
                                    return  categoriaPorEmpresa(d.empresa);
                                }else if(this.state.categorizar == "location"){
                                    return categoriaPorLocalizacion(d.location);
                                }else if(this.state.categorizar == "tipoViaje"){
                                    return categoriaPorTipo(d.tipoViaje);
                                }else if(this.state.categorizar == "user"){
                                    return categoriaPorUsuario(d.userID);
                                }else{
                                    return svgWidth/2;
                                }
                        }))
                        .force("y", d3.forceY(svgHeight/2)) 
                        .force("collide", d3.forceCollide(r) )
                        .force("charge", d3.forceManyBody().strength(-20))
                        .on("tick", ticked)
    
        
    }


    render(){
        let style = {
            width: '100%',
            height: '100%'
        }
        
        return(
            <div style={style}>

                <div style={style}>
                        <div className="modal-content" id="innerContainer" style={style}>
                            {console.log("categoria aux", this.state.categorizar)}
                        </div>
                </div>

                <div style={{height: "30%", width: "100%"}} >
                    <form>
                        <div className="radio">
                            <label htmlFor="radioEmpresa">
                                <label>Empresa </label>
                                <input id="radioEmpresa" type="radio" value="empresa" checked={this.state.categorizar == "empresa"} onChange={this.handleOptionChange}></input>
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <label>Location </label> 
                                <input type="radio" value="location" checked={this.state.categorizar == "location"} onChange={this.handleOptionChange}></input>
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <label>Tipo Viaje </label>
                                <input type="radio" value="tipoViaje" checked={this.state.categorizar == "tipoViaje"} onChange={this.handleOptionChange}></input>
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <label>Usuario </label>
                                <input type="radio" value="user" checked={this.state.categorizar == "user"} onChange={this.handleOptionChange}></input>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
