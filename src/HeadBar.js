import React from 'react'

function HeadBar(props) {
    return (
        <div className="HeadBar">
            <div id="logo"><b>CIRCULAR PATTERNS</b></div>
            {<div id="menu">
                <div><button onClick={props.onViewChange}>CHANGE PARAMETER</button></div>
            </div>}
        </div>
    )
}

export default HeadBar