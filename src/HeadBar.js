import React from 'react'

function HeadBar(props) {
    return (
        <div className="HeadBar">
            <div id="logo"><b>CIRCULAR PATTERNS by Kalle Rissanen</b></div>
            <div id="parameter"><button onClick={props.onViewChange}>PARAMETER: {props.parameter.toUpperCase()}</button></div>
        </div>
    )
}

export default HeadBar