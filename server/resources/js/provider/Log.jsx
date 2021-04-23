import React, { useContext, useState } from "react";
import { Banner } from '@shopify/polaris'

const LogContext = React.createContext();

export function useLog() {
    return useContext(LogContext);
}

export default function Log(props) {
    const [logs, setLogs] = useState([]);

    function removeLog(banner) {
        setLogs(logs.filter(logBanner => logBanner !== banner));
    }

    function initAutoremove(banner) {
        setTimeout(() => removeLog(banner), 3000);
    }

    function log(message, status) {
        const banner = <Banner title={message} status={status} onDismiss={() => removeLog(banner)}/>;
        setLogs(prevLogs => [...prevLogs, banner]);
        initAutoremove(banner);
    }

    function success(message) {
        log(message, "success");
    }

    function error(message) {
        log(message, "critical");
    }

    const value = {
        logs,
        success,
        error
    };

    return (
        <LogContext.Provider value={value}>
            {props && props.children}
        </LogContext.Provider>
    );
}
