import React from 'react'
import './App.css';
import Canvas from './Canvas.js';
import Graph from './Graph';
import Data from './Data';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.replaceDataValue = this.replaceDataValue.bind(this);

    this.state = {
      data: new Data()
    }
  }

  generateDataSet = (val, size) => {
    let data = []
    for(let i = 0; i < size; i++) {
        data[i] = {x: i, y: val}
    }
    return data
  }

  replaceDataValue = (i, v) => {
    var tempData = this.state.data
    tempData[i].y = v
    this.setState({data: tempData})
  }

  componentDidUpdate() {}

  render() { return (
    <div className="App">
      <Canvas data={this.state.data}/>
      <Graph data={this.state.data}/>
    </div>
  )}
}

export default App;
