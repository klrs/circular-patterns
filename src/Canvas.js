import React from 'react'

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.onPlay = this.onPlay.bind(this);
        this.onClear = this.onClear.bind(this);

        this.state = {
            canvasRef: React.createRef(),
            orientation: 0,
            centerPos: null
        };
    }

    nextPos(orientation) {
        return {
            x: this.state.centerPos.x + (this.props.data.get(orientation) * Math.cos(orientation*2*Math.PI)),
            y: this.state.centerPos.y - (this.props.data.get(orientation) * Math.sin(orientation*2*Math.PI))
        }
    }
    
    componentDidMount() {
        const cPos = {x: this.state.canvasRef.current.width / 2, y: this.state.canvasRef.current.height / 2}
        this.setState({centerPos: cPos})
        const ctx = this.state.canvasRef.current.getContext('2d')
        ctx.moveTo(this.state.canvasRef.current.width / 2, this.state.canvasRef.current.height / 2)
        ctx.beginPath()
    }

    componentDidUpdate() {

        const ctx = this.state.canvasRef.current.getContext('2d')
        ctx.lineTo(this.nextPos(this.state.orientation).x, this.nextPos(this.state.orientation).y)
        ctx.stroke()
    }

    resetPath(ctx) {
        ctx.closePath()
        ctx.moveTo(this.state.centerPos.x, this.state.centerPos.y)
        //ctx.beginPath()
    }

    async onPlay() {

        const ctx = this.state.canvasRef.current.getContext('2d')
        const STEP = 0.01

        for(let i = 0; i <= 1; i = i + STEP) {
            this.setState({orientation: i})

            await new Promise(r => setTimeout(r, 5));
        }

        this.resetPath(ctx)
    }

    onClear() {
        const ctx = this.state.canvasRef.current.getContext('2d')
        this.resetPath(ctx)
        ctx.clearRect(0, 0, this.state.canvasRef.current.width, this.state.canvasRef.current.height)
    }

    render() { return (
        <div className="Canvas">
            <h1>Canvas</h1>
            <canvas ref={this.state.canvasRef} height={480} width={480} />
            <button onClick={this.onPlay}>Play</button>
            <button onClick={this.onClear}>Clear</button>
        </div>
    )}

}

export default Canvas