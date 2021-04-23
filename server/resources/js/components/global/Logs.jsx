import React from 'react'

import { useLog } from '@provider/Log'

export default function Logs() {
    const { logs } = useLog();
    
    return (
        <ul className="fixed-bottom list-style-none m-0 p-0">
            { logs.map((log, i) => <li key={i}>{log}</li>) }
        </ul>
    );
}