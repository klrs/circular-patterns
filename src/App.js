import React from 'react'
import './App.css';
import Canvas from './Canvas.js';
import Graph from './Graph';
import Data from './Data';

class App extends React.Component {

  constructor(props) {
    super(props)

    //this.replaceDataValue = this.replaceDataValue.bind(this);
    this.onChange = this.onChange.bind(this)
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

  render() { return (
    <div className="App">
      <Canvas data={this.state.data}/>
      <Graph data={this.state.data} onChange={this.onChange}/>
    </div>
  )}
}

export default App;
