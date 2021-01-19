import React from 'react'

function HeadBar(props) {
    return (
        <div className="HeadBar">
            <div id="logo"><b>CIRCULAR PATTERNS</b></div>
            <div id="header">2021 Kalle Rissanen</div>
            {/* <div id="menu">
                <div><button onClick={() => props.onNavigation("canvas")}>DRAW</button></div>
                <div><button onClick={() => props.onNavigation("graph")}>GRAPH</button></div>
            </div> */}
        </div>
    )
}

export default HeadBar