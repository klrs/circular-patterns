import React from 'react'
import './App.css';
import Canvas from './Canvas.js';
import Graph from './Graph';
import Data, { Point } from './Data';

class App extends React.Component {

  constructor(props) {
    super(props)

    //this.replaceDataValue = this.replaceDataValue.bind(this);
    this.onChange = this.onChange.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onReverse = this.onReverse.bind(this)
    this.onSnap = this.onSnap.bind(this)
    this.onDefault = this.onDefault.bind(this)
    this.state = {
      //data: []
      data: new Data({}, true),
      yScaleMin: -50, yScaleMax: 50
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

  render() { return (
    <div className="App">
      <div className="Meat">
        <Canvas data={this.state.data} setPlay={play => this.playCanvas = play} setClear={clear => this.clearCanvas = clear}/>
        <Graph
          data={this.state.data} onChange={this.onChange} onAdd={this.onAdd}
          xMin={0} xMax={1} yMin={this.state.yScaleMin} yMax={this.state.yScaleMax}
        />
      </div>
      <div className="Buttons">
        <button onClick={() => this.playCanvas()}>Play</button>
        <button onClick={() => this.clearCanvas()}>Clear</button>
        <button onClick={this.onReverse}>Reverse</button>
        <button onClick={this.onSnap}>Snap</button>
        <button onClick={this.onDefault}>Default</button>
      </div>
    </div>
  )}
}

export default App;
