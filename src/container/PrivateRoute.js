import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, authed, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            (roles && roles.indexOf(authed) !== -1)
                ? <Component {...props} route={props.route} />
                : <Redirect to="/" />
        )}
    />
);

export default PrivateRoute;

