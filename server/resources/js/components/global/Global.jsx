import React from "react";

import PolarisWrapper from "./PolarisWrapper.jsx";
import Routes from "./routes/Routes";
import Logs from './Logs';

import UserProvider from "@provider/User";
import LogProvider from "@provider/Log";

export default function Global() {
    return (
        <PolarisWrapper>
            <UserProvider>
                <LogProvider>
                    <Routes />
                    <Logs />
                </LogProvider>
            </UserProvider>
        </PolarisWrapper>
    );
}
