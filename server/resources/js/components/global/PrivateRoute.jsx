import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom'

import { requireAuth } from "@utils/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
    const [authenticated, setAuthenticated] = useState(true);

    useEffect(() => {
        async function fetch() {
            const res = await requireAuth();
            setAuthenticated(res);
        }

        fetch();
    }, [])

    return (
        <Route
          {...rest}
          render={props =>
            authenticated ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
            )
          }
        />
    )
}