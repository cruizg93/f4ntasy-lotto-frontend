import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Auth from '../../auth/Auth';
import {authenticationService} from '../../service/api/authentication/authentication.service';

export const PrivateRoute = ({component: Component, ...rest}) => {

    return (
        <Route
            {...rest}
            render={props => {
                // if (Auth.isAuthenticated()) {
                //     return (
                //         <>
                //
                //             <Dashboard childComponent={<Component{...props}/>}/>
                //
                //         </>
                //     );
                // } else {
                //     return (
                //         <Redirect to="/login"/>
                //     )
                // }
                const currentUser = authenticationService.currentUserValue;
                if (!currentUser) {
                    // not logged in so redirect to login page with the return url
                    return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                }

                // authorised so return component
                return <Dashboard childComponent={<Component{...props}/>} />
            }


            }
        />
    )
};

