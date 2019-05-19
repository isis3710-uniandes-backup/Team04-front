import React, {Component} from 'react';
import * as d3 from 'd3';
export default class DataShowModel extends Component{

    state = {
        categorizar: this.props.selectedOption,
        network: this.props.network
    }
    componentDidMount = () =>{
            var svgWidth  = document.getElementById('innerContainer').offsetWidth, svgHeight = document.getElementById('innerContainer').offsetHeight;
            let context = this;
            console.log(this.state.network);
            let networkPromise = new Promise(function(resolve, reject){
                resolve(context.state.network);
            })

            networkPromise.then(network =>{
                let categoriaPorUsuario = d3.scalePoint()
                                .domain(d3.set(network.nodes.map(d=>d.userID)).values()
                                .sort((a,b) => d3.ascending(a, b)))
                                .range([0, svgWidth])
    
    
                let categoriaPorEmpresa = d3.scalePoint()
                            .domain(d3.set(network.nodes.map(d=>d.empresa)).values()
                            .sort((a,b) => d3.ascending(a, b)))
                            .range([0, svgWidth])
    
    
                let categoriaPorLocalizacion =  d3.scalePoint()
                                                .domain(d3.set(network.nodes.map(d=>d.location)).values()
                                                .sort((a,b) => d3.ascending(a, b)))
                                                .range([0, svgWidth])
    
                let categoriaPorTipo =  d3.scalePoint()
                                    .domain(d3.set(network.nodes.map(d=>d.tipoViaje)).values()
                                    .sort((a,b) => d3.ascending(a, b)))
                                    .range([0, svgWidth])
    
                let r = 12;
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
    
    
                function ticked(){
                    console.log("ticked");
                    nodesSel
                    .attr("cx",d => {
                            return d.x
                        })
                    .attr("cy", d => {
                        return d.y
                        });
    
                    linksSel
                        .attr("x1", l=> l.source.x)
                        .attr("y1", l=> l.source.y)
                        .attr("x2", l=> l.target.x)
                        .attr("y2", l=> l.target.y)
                        .style("stroke", l => c(l.source.userID))
                }
                let simulation = d3.forceSimulation(network.nodes)
                                .force("links", d3.forceLink(network.links).strength(0.001))
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

            })
        };
    
        

        render(){
            return(
                <div style={this.props.style}>
                        <div className="modal-content" id="innerContainer" style={this.props.style}>
                        </div>
                </div>
            )
        }
        
}
