import React from 'react'
import * as d3 from "d3";

class Graph extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            width: 480,
            height: 480
        }
    }

    componentDidMount() {
        this.drawChart()
    }

    componentDidUpdate() {
        this.drawChart()
    }

    drawChart() {


        const margin = {top: 20, right: 20, bottom: 20, left: 20}

        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))

        const xScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0 + margin.right, this.state.width - margin.left]);

        const yScale = d3.scaleLinear()
            .domain([0, 50])
            .range([0 + margin.top, this.state.height - margin.bottom]);

        const xScaleInvert = d3.scaleLinear()
            .clamp(true)
            .domain([0, 480])
            .range([0, 1])

        const yScaleInvert = d3.scaleLinear()
            .clamp(true)
            .domain([0, 480])
            .range([0, 1])

        const svg = d3.select("svg")

        d3.select("rect")
            .on("click", event => {alert("yeah")})

        //remove prev path
        svg.selectAll("path").remove()

        const dataPoints = (STEP) => {
            let arr = []
            for(let i = 0; i <= 1; i = i + STEP) arr.push({x: i, y: this.props.data.get(i)})
            return arr
        }

        svg.append("g")
            .attr("transform", `translate(0,${margin.bottom})`)
            .call(d3.axisTop(xScale))

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))

        const graph = svg.append("path")
            .datum(dataPoints(0.1))
                .attr("d", line)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 2)
    }

    render () { return (
        <div className="Graph">
            <h1>Radius graph</h1>
            <svg height={this.state.height} width={this.state.width}>
                <g>
                    <rect fill={"#d6d6d6"} height={this.state.height} width={this.state.width}></rect>
                </g>
            </svg>
        </div>
        )
    }
}

export default Graph