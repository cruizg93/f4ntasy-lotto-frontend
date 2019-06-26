import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Auth from '../../auth/Auth';


export const PrivateRoute = ({component: Component, ...rest}) => {

    return (
        <Route
            {...rest}
            render={props => {
                if (Auth.isAuthenticated()) {
                    return (
                        <>

                            <Dashboard childComponent={<Component{...props}/>}/>

                        </>
                    );
                } else {
                    return (
                        <Redirect to="/login"/>
                    )
                }
            }


            }
        />
    )
};

