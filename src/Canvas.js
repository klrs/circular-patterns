import React from 'react'

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.onPlay = this.onPlay.bind(this)
        this.onClear = this.onClear.bind(this)
        this.onSave = this.onSave.bind(this)

        this.state = {
            canvasRef: React.createRef(),
            orientation: 0,
            centerPos: null
        };
    }

    nextPos(orientation) {
        const radians = this.props.degreeData.get(orientation) / 360 * 2 * Math.PI
        return {
            x: this.state.centerPos.x + (this.props.radiusData.get(orientation) * Math.cos(radians)),
            y: this.state.centerPos.y - (this.props.radiusData.get(orientation) * Math.sin(radians))
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

    onSave() {
        var link = document.createElement("a");
        link.download = "canvas.png";
        link.href = this.state.canvasRef.current.toDataURL("image/png");
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() { return (
        <div className="Canvas">
            <div>
                <canvas ref={this.state.canvasRef} height={this.props.height} width={this.props.width} />
                <div className="ButtonContainer">
                    <div><button onClick={this.onPlay}>PLAY</button></div>
                    <div><button onClick={this.onClear}>CLEAR</button></div>
                    <div><button onClick={this.onSave}>SAVE</button></div>
                </div>
            </div>
        </div>
    )}

}

function Downloader(props) {
    return (
        React.createElement('a', {
            download: 'canvas.png',
            href: props.canvas.toDataURL('image/png')}, null)
    )
}

export default Canvas