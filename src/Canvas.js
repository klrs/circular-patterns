import React from 'react'

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.onPlay = this.onPlay.bind(this);

        this.state = {
            canvasRef: React.createRef(),
            deg: 0,
            r: 20,
            centerPos: null
        };
    }

    nextPos(deg, r) {
        return {x: this.state.centerPos.x + (r * Math.cos(deg/360 * 2*Math.PI)), y: this.state.centerPos.y - (r * Math.sin(deg/360 * 2*Math.PI))}
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
        //this.setState({pos: this.nextPos(this.state.deg, this.state.r)})
        ctx.lineTo(this.nextPos(this.state.deg, this.state.r).x, this.nextPos(this.state.deg, this.state.r).y)
        ctx.stroke()
    }

    async onPlay() {

        for(let i = 0; i <= 360; i++) {
            this.setState({deg: i})
            this.setState({r: this.state.r + (2*Math.sin(this.state.deg))})
            await new Promise(r => setTimeout(r, 1));
        }

        const ctx = this.state.canvasRef.current.getContext('2d')
        ctx.closePath()
        ctx.moveTo(this.state.centerPos.x, this.state.centerPos.y)
        ctx.beginPath()
    }

    render() { return (
        <div className="Canvas">
            <canvas ref={this.state.canvasRef} height={480} width={480} />
            <button onClick={this.onPlay}>
            Play
            </button>
        </div>
    )}

}

export default Canvas