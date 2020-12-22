import React from 'react'
import * as d3 from "d3";

class Graph extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            svgRef: React.createRef(),
            data: this.INITIAL_DATA(20, 360)
        }
    }

    INITIAL_DATA = (val, size) => {
        let data = []
        for(let i = 0; i < size; i++) {
            data[i] = {x: i, y: val}
        }
        return data
    }

    componentDidMount() {
        this.drawChart()
    }

    componentDidUpdate() {
        this.drawChart()
    }

    drawChart() {
        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))

        const xScale = d3.scaleLinear()
            .domain([0, 359])
            .range([0, 480]);

        const yScale = d3.scaleLinear()
            .domain([0, 50])
            .range([0, 480]);

        const yScale2 = d3.scaleLinear()
            .domain([0, 50])
            .range([10, 470]);

        const xScaleInvert = d3.scaleLinear()
            .domain([0, 480])
            .range([0, 359]);

        const yScaleInvert = d3.scaleLinear()
            .domain([0, 480])
            .range([0, 50]);

        const replaceDataValue = (i, v) => {
            var tempData = this.state.data
            tempData[i].y = v
            this.setState({data: tempData})
        }

        const svg = d3.select("svg")
            .on("click", (event) => {
                const i = Math.round(xScaleInvert(d3.pointer(event)[0]))
                const v = Math.round(yScaleInvert(d3.pointer(event)[1]))
                replaceDataValue(i, v)
                console.log(this.state.data)
            })

        const graph = svg.append("path")
            .datum(this.state.data)
                .attr("d", line)
                .attr("stroke", "black")
                .attr("stroke-width", 2)

        const text = svg.selectAll("text")
            .data([0, 10, 20, 30, 40, 50]).enter().append("text")
                .text(d => d)
                .attr("x", d => 10)
                .attr("y", d => yScale2(d))
    }

    render () { return (
        <div className="Graph">
            <svg ref={this.state.svgRef} height={480} width={480}></svg>
        </div>
        )
    }
}

export default Graph