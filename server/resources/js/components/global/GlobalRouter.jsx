import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import history from "@utils/createHistory.js";

import Products from "@pages/Products.jsx";
import PageError from "@pages/PageError.jsx";
  
export default function GlobalRouter() {
    return (
        <Router history={history}>
            <Switch>
                <Redirect exact from="/" to="/products" />
                <Route path="/products" component={Products} />
                <Route component={PageError} />
            </Switch>
        </Router>
    )
}