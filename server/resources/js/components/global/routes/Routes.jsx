import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "@utils/createHistory.js";

import PrivateRoute from "./PrivateRoute";
import OnlyPublicRoute from "./OnlyPublicRoute";
import GlobalNavbar from "../Navbar.jsx";
import ContentContainer from "../../containers/Content";

import Welcome from "@pages/Welcome.jsx";
import Products from "@pages/Products.jsx";
import SearchProducts from "@pages/SearchProducts.jsx";
import AuthRegister from "@pages/Auth/Register.jsx";
import AuthLogin from "@pages/Auth/Login.jsx";
import Dashboard from "@pages/Dashboard.jsx";
import PageError from "@pages/PageError.jsx";

import { useUser } from "@provider/User";

export default function GlobalRouter() {
    const { currentUser } = useUser();
    return (
        <Router history={history}>
            <GlobalNavbar />
            <ContentContainer className="min-h-100vh skip-navbar-height">
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={currentUser ? Dashboard : Welcome}
                    />

                    <OnlyPublicRoute
                        exact
                        path="/auth/register"
                        component={AuthRegister}
                    />
                    <OnlyPublicRoute
                        exact
                        path="/auth/login"
                        component={AuthLogin}
                    />

                    <PrivateRoute path="/products/new" component={Products} />
                    <PrivateRoute path="/search" component={SearchProducts} />

                    <Route component={PageError} />
                </Switch>
            </ContentContainer>
        </Router>
    );
}
