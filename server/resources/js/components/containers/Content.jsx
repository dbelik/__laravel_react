import React from "react";

export default function Content({ children, className, ...props }) {
    return (
        <div
            {...props}
            className={`content-container bg-white shadow-sm ${className}`}
        >
            {children}
        </div>
    );
}
