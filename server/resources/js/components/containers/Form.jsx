import React from 'react';

export default function Form(props) {
    return (
        <div className="form-container h-auto bg-form p-4 pt-md-5 pb-md-4 px-md-5 rounded shadow-sm">{props.children}</div>
    )
}