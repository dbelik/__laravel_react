import React from "react";

import PolarisWrapper from "./PolarisWrapper.jsx";
import Router from "./GlobalRouter";

import UserProvider from "@provider/User";

export default function Global() {
    return (
        <PolarisWrapper>
            <UserProvider>
                <Router />
            </UserProvider>
        </PolarisWrapper>
    );
}
