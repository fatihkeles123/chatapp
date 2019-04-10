import React from 'react';
const Emoji = props => (
    <button
        className="emoji"
		onClick={props.onClick}
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </button>
);
export default Emoji;