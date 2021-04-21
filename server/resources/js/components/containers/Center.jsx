import React from "react";

export default function Center(props) {
    return (
        <div
            className={`h-100 w-100 d-flex align-items-center justify-content-center ${props.className}`}
        >
            {props.children}
        </div>
    );
}
