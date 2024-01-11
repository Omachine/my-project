import React from 'react';

function FireBall({ x, y }) {
    return (
        <div
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: '10px',
                height: '10px',
                backgroundColor: 'red',
            }}
        />
    );
}

export default FireBall;