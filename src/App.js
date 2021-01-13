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
    this.state = {
      //data: []
      data: new Data({})
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

  render() { return (
    <div className="App">
      <Canvas data={this.state.data}/>
      <Graph data={this.state.data} onChange={this.onChange} onAdd={this.onAdd}/>
    </div>
  )}
}

export default App;
