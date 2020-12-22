import React from 'react'
import './App.css';
import Canvas from './Canvas.js';
import Graph from './Graph';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.generateDataSet(20, 360)
    }
  }

  generateDataSet = (val, size) => {
    let data = []
    for(let i = 0; i < size; i++) {
        data[i] = {x: i, y: val}
    }
    return data
}

  render() { return (
    <div className="App">
      <Canvas/>
      <Graph/>
    </div>
  )}
}

export default App;
