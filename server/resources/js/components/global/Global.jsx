import React from "react";

import PolarisWrapper from "./PolarisWrapper.jsx";
import Routes from "./routes/Routes";

import UserProvider from "@provider/User";

export default function Global() {
    return (
        <PolarisWrapper>
            <UserProvider>
                <Routes />
            </UserProvider>
        </PolarisWrapper>
    );
}
