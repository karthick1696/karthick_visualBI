import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserDetails } from '../../common/utils';

export const PrivateRoute = ({
    comp: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                getUserDetails() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            )}
        />
    );
};
