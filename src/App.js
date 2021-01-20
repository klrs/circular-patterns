import React from 'react'
import './App.css';
import Canvas from './Canvas.js';
import Graph from './Graph';
import Data, { Point } from './Data';
import HeadBar from './HeadBar';
import { render } from 'react-dom';
import { timeHours } from 'd3';

class App extends React.Component {

  //TODO CREATE SMART SCALING FOR DIFFERENT DATA

  constructor(props) {
    super(props)

    //this.replaceDataValue = this.replaceDataValue.bind(this);
    this.onChange = this.onChange.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onReverse = this.onReverse.bind(this)
    this.onSnap = this.onSnap.bind(this)
    this.onDefault = this.onDefault.bind(this)
    this.onViewChange = this.onViewChange.bind(this)
    this.state = {
      //data: []
      radiusData: new Data({}, true, "radiusData", 50, 50),
      radiusDataScale: {min: 0, max: 0},
      degreeData: new Data({}, true, "degreeData", 0, 360),
      degreeDataScale: {min: 0, max: 0},
      view: "radius"
    }
  }

  componentDidMount() {
    this.setState({
      radiusDataScale: this.state.radiusData.getScale(),
      degreeDataScale: this.state.degreeData.getScale()
    })
  }

  componentDidUpdate() {}

  onChange(i, py, data) {
    data.replace(i, py, "linear")
    this.setState({[data.id]: data.copy()})
  }

  onAdd(px, py, data) {
    data.add({x: px, y: py}, "linear")
    this.setState({[data.id]: data.copy()})
  }

  onReverse(data) {
    console.log("onReverse called")
    this.setState({[data.id]: data.reverse()})
  }

  onSnap(data) {
    const newData = data.snap()
    this.setState({
      [data.id]: newData,
      [data.id + "Scale"]: newData.getScale()
    })
  }

  onDefault(data) {
    const newData = data.resetCopy()
    this.setState({
      [data.id]: newData,
      [data.id + "Scale"]: newData.getScale()
    })
  }

  onViewChange() {
    let view
    if(this.state.view === "radius") view = "degree"
    else view = "radius"
    
    this.setState({view: view})
  }

  render() {
    let view
    if(this.state.view === "radius") {
      view = <Graph
        data={this.state.radiusData} onChange={this.onChange} onAdd={this.onAdd} color="red"
        xMin={0} xMax={1} yMin={this.state.radiusDataScale.min} yMax={this.state.radiusDataScale.max}
        onReverse={this.onReverse} onSnap={this.onSnap} onDefault={this.onDefault}
      />
    }
    else if(this.state.view === "degree") {
      view = <Graph
        data={this.state.degreeData} onChange={this.onChange} onAdd={this.onAdd} color="blue"
        xMin={0} xMax={1} yMin={this.state.degreeDataScale.min} yMax={this.state.degreeDataScale.max}
        onReverse={this.onReverse} onSnap={this.onSnap} onDefault={this.onDefault}
      />
    }

    return (
      <div className="App">
        <HeadBar onViewChange={this.onViewChange}/>
        <div className="Body">
          <div className="Meat">
            <Canvas
              radiusData={this.state.radiusData} degreeData={this.state.degreeData}
              setPlay={play => this.playCanvas = play} setClear={clear => this.clearCanvas = clear}
            />
            {view}
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
