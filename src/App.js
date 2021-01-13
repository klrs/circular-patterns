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
    this.onDefault = this.onDefault.bind(this)
    this.state = {
      //data: []
      data: new Data({}, true)
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

  onDefault() {
    this.setState({data: new Data({}, true)})
  }

  render() { return (
    <div className="App">
      <div className="Meat">
        <Canvas data={this.state.data} setPlay={play => this.playCanvas = play} setClear={clear => this.clearCanvas = clear}/>
        <Graph data={this.state.data} onChange={this.onChange} onAdd={this.onAdd}/>
      </div>
      <div className="Buttons">
        <button onClick={() => this.playCanvas()}>Play</button>
        <button onClick={() => this.clearCanvas()}>Clear</button>
        <button onClick={this.onReverse}>Reverse</button>
        <button onClick={this.onDefault}>Default</button>
      </div>
    </div>
  )}
}

export default App;
