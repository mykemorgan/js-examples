import React from 'react';

// TicTacToe individual board square Component
function Square({onClick, value}) {
    return (
        <button className="square" onClick={onClick}>
        {value}
        </button>
    );
}

export default Square;
