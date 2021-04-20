import React from 'react';

export default function Form(props) {
    return (
        <div className="form-container h-auto bg-form py-4 px-5 rounded">{props.children}</div>
    )
}