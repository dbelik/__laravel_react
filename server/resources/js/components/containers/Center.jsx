import React from 'react';

export default function Center(props) {
    return (
        <div className="h-100vh w-100vw d-flex align-items-center justify-content-center">{props.children}</div>
    )
}