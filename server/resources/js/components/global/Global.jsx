import React from "react";

import PolarisWrapper from "./PolarisWrapper.jsx";
import Router from "./GlobalRouter";

export default function Global() {
    return (
        <PolarisWrapper>
            <Router />
        </PolarisWrapper>
    );
}
