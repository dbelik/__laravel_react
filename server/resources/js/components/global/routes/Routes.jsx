import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "@utils/createHistory.js";

import PrivateRoute from "./PrivateRoute";
import OnlyPublicRoute from "./OnlyPublicRoute";
import GlobalNavbar from "../Navbar.jsx";
import ContentContainer from "../../containers/Content";

import Welcome from "@pages/Welcome.jsx";
import Dashboard from "@pages/Dashboard.jsx";

import AuthRegister from "@pages/Auth/Register.jsx";
import AuthLogin from "@pages/Auth/Login.jsx";

import DetailsProduct from "@pages/Product/Details.jsx";
import CreateProduct from "@pages/Product/Create.jsx";
import SearchProducts from "@pages/Product/Search.jsx";

import NotFound from "@pages/Errors/NotFound.jsx";

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

                    <PrivateRoute exact path="/products/new" component={CreateProduct} />
                    <PrivateRoute exact path="/products/:id" component={DetailsProduct} />
                    <PrivateRoute exact path="/search" component={SearchProducts} />

                    <Route component={NotFound} />
                </Switch>
            </ContentContainer>
        </Router>
    );
}
