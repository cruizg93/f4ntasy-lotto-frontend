import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import {authenticationService} from '../../service/api/authentication/authentication.service';

export const PrivateRoute = ({component: Component, roles, ...rest}) => {

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
                const currentRole = authenticationService.type_user();
                if (!currentUser) {
                    // not logged in so redirect to login page with the return url
                    return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                }
                // check if route is restricted by role
                if (roles && roles.indexOf(currentRole) === -1) {
                   
                    // role not authorised so redirect to home page
                    return <Redirect to={{pathname: '/'}}/>
                }                                       

               // authorised so return component
               return <Dashboard childComponent={<Component{...props}/>}/>
            }


            }
        />
    )
};

