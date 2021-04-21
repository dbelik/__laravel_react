import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import GlobalNavbar from './Navbar.jsx';

import history from "@utils/createHistory.js";
import { requireAuth } from "@utils/auth.js";

import Products from "@pages/Products.jsx";
import PageError from "@pages/PageError.jsx";

import AuthRegister from "@pages/Auth/Register.jsx";
import AuthLogin from "@pages/Auth/Login.jsx";
  
export default function GlobalRouter() {
    return (
        <Router history={history}>
            <GlobalNavbar />
            <Switch>
                <Redirect exact from="/" to="/products/new" />

                <Route exact path="/auth/register" component={AuthRegister} />
                <Route exact path="/auth/login" component={AuthLogin} />

                <Route exact path="/products/new" component={Products} onEnter={requireAuth} />

                <Route component={PageError} />
            </Switch>
        </Router>
    )
}