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
        this.props.setPlay(this.onPlay)
        this.props.setClear(this.onClear)

        const cPos = {x: this.state.canvasRef.current.width / 2, y: this.state.canvasRef.current.height / 2}
        this.setState({centerPos: cPos})
        const ctx = this.state.canvasRef.current.getContext('2d')
        // ctx.moveTo(this.state.canvasRef.current.width / 2, this.state.canvasRef.current.height / 2)
        // ctx.beginPath()
    }

    componentDidUpdate() {

        const ctx = this.state.canvasRef.current.getContext('2d')
        ctx.lineTo(this.nextPos(this.state.orientation).x, this.nextPos(this.state.orientation).y)
        //ctx.stroke()
    }

    resetPath(ctx) {
        //ctx.closePath()
        //ctx.moveTo(this.state.centerPos.x, this.state.centerPos.y)
        //ctx.beginPath()
    }

    async onPlay() {

        const ctx = this.state.canvasRef.current.getContext('2d')
        const STEP = 0.01 
        const EXECUTE_TIME_MIN = 200 * STEP //ms

        ctx.moveTo(this.state.canvasRef.current.width / 2, this.state.canvasRef.current.height / 2)
        ctx.beginPath()

        for(let i = 0; i <= 1 + STEP; i = i + STEP) {
            let t0 = performance.now()
            if(i > 1) this.setState({orientation: 1}); else this.setState({orientation: i})
            ctx.stroke()
            let t1 = performance.now()
            let deltaTime = t1 - t0

            if(deltaTime < EXECUTE_TIME_MIN) { await new Promise(r => setTimeout(r, EXECUTE_TIME_MIN - deltaTime)); }
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
        </div>
    )}

}

export default Canvas