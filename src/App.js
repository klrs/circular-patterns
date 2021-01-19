import React from 'react'
import './App.css';
import Canvas from './Canvas.js';
import Graph from './Graph';
import Data, { Point } from './Data';
import HeadBar from './HeadBar';
import { render } from 'react-dom';

class App extends React.Component {

  constructor(props) {
    super(props)

    //this.replaceDataValue = this.replaceDataValue.bind(this);
    this.onChange = this.onChange.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onReverse = this.onReverse.bind(this)
    this.onSnap = this.onSnap.bind(this)
    this.onDefault = this.onDefault.bind(this)
    this.onNavigation = this.onNavigation.bind(this)
    this.state = {
      //data: []
      data: new Data({}, true),
      yScaleMin: -50, yScaleMax: 50,
      view: "canvas"
    }
  }

  componentDidMount() {
    //this.setState({data: this.state.data.copy()})
    //this.onChange(0, 20)
  }

  componentDidUpdate() {}

  onChange(i, py) {
    this.state.data.replace(i, py, "linear")
    this.setState({data: this.state.data.copy()})
  }

  onAdd(px, py) {
    this.state.data.add({x: px, y: py}, "linear")
    this.setState({data: this.state.data.copy()})
  }

  onReverse() {
    this.setState({data: this.state.data.reverse()})
  }

  onSnap() {
    console.log("scale:" + this.state.yScaleMin + " " + this.state.yScaleMax)

    this.setState({
      data: this.state.data.snap(),
      yScaleMin: this.state.data.getScale().min,
      yScaleMax: this.state.data.getScale().max
    })
    //TODO NOT THE BEST SYSTEM FOR USER.
    //CHANGE X AXIS
    console.log("scale:" + this.state.yScaleMin + " " + this.state.yScaleMax)
  }

  onDefault() {
    this.setState({
      data: new Data({}, true),
      yScaleMin: -50,
      yScaleMax: 50
    })
  }

  onNavigation(view) {
    this.setState({view: view})
  }

  render() {
    let view
    if(this.state.view === "canvas") {
      view = <Canvas data={this.state.data} setPlay={play => this.playCanvas = play} setClear={clear => this.clearCanvas = clear}/>
    }
    else if(this.state.view === "graph") {
      view = <Graph
        data={this.state.data} onChange={this.onChange} onAdd={this.onAdd}
        xMin={0} xMax={1} yMin={this.state.yScaleMin} yMax={this.state.yScaleMax}
      />
    }

    return (
      <div className="App">
        <HeadBar onNavigation={this.onNavigation}/>
        <div className="Body">
          <div className="Meat">
            <Canvas data={this.state.data} setPlay={play => this.playCanvas = play} setClear={clear => this.clearCanvas = clear}/>
            <Graph
              data={this.state.data} onChange={this.onChange} onAdd={this.onAdd}
              xMin={0} xMax={1} yMin={this.state.yScaleMin} yMax={this.state.yScaleMax}
              onReverse={this.onReverse} onSnap={this.onSnap} onDefault={this.onDefault}
            />
          </div>
          {/* <div className="Buttons">
            <button onClick={() => this.playCanvas()}>Play</button>
            <button onClick={() => this.clearCanvas()}>Clear</button>
            <button onClick={this.onReverse}>Reverse</button>
            <button onClick={this.onSnap}>Snap</button>
            <button onClick={this.onDefault}>Default</button>
          </div> */}
        </div>
      </div>
  )}
}

export default App;
