import React from 'react'
import * as d3 from "d3";

class Graph extends React.Component {

    constructor(props) {
        super(props)

        this.margin = {top: 20, right: 20, bottom: 20, left: 20}
        this.width = 480; this.height = 480;
        this.xScale = d3.scaleLinear().domain([0, 1]).range([0 + this.margin.right, this.width - this.margin.left]);
        this.yScale = d3.scaleLinear().domain([0, 50]).range([0 + this.margin.top, this.height - this.margin.bottom]);
    }

    componentDidMount() {
        this.drawChart()
        this.drawPath()
    }

    componentDidUpdate() {
        this.drawPath()
    }

    drawPath() {
        const line = d3.line()
            .x(d => this.xScale(d.x))
            .y(d => this.yScale(d.y))

        const drag = d3.drag()
            .on("drag", (event, d) => {
                //omits setState, that's why it doesn't work
                console.log("event: ", event)
                console.log("d: ", d)
                this.props.onChange(d.value.p.x, this.yScale.invert(event.y))
                //d.p.y = this.yScale.invert(event.y)
                console.log("y:"+this.yScale.invert(event.y))
            })
            //.subject({x: this.xScale(0), y: this.yScale(0)})

        const addPoints = () => {
            console.log("addPoints(): ", this.props.data.pointList)
            svg.selectAll("pathCircles")
                .data(this.props.data.toList())
                .enter()
                .append("circle")
                    .attr("id", "pathPoints")
                    .attr("cx", d => this.xScale(d.value.p.x))
                    .attr("cy", d => this.yScale(d.value.p.y))
                    .attr("fill", "red")
                    .attr("r", 4)
                    .on("mouseover", function(d) { d3.select(this).attr("stroke", "black").attr("stroke-width", 4) })
                    .on("mouseout", function(d) { d3.select(this).attr("stroke", "none") })
                    .call(drag)
                    .on("click", event => { if(event.defaultPrevented) return })

        }

        const dataPoints = (STEP) => {
            let arr = []
            for(let i = 0; i <= 1; i = i + STEP) arr.push({x: i, y: this.props.data.get(i)})
            return arr
        }

        const svg = d3.select("svg")
        const data = dataPoints(0.1)
        console.log(data)
        
        svg.selectAll("#pathPoints").remove()
        addPoints()

        svg.selectAll("#dataPath").remove()
        const graph = svg.append("path")
            .attr("id", "dataPath")
            .datum(data)
                .attr("d", line)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 2)
    }

    drawChart() {
        const svg = d3.select("svg")

        const addAxes = () => {
            svg.append("g")
            .attr("transform", `translate(0,${this.margin.bottom})`)
            .call(d3.axisTop(this.xScale))

        svg.append("g")
            .attr("transform", `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(this.yScale))
        }

        // d3.select("rect")
        //     .on("click", event => {alert("yeah")})
        addAxes()
    }

    render () { return (
        <div className="Graph">
            <h1>Radius graph</h1>
            <svg height={this.height} width={this.width}>
                <g>
                    <rect fill={"#d6d6d6"} height={this.height} width={this.width}></rect>
                </g>
            </svg>
        </div>
        )
    }
}

export default Graph