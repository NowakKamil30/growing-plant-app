import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface PrivateRouteProps {
    path: string;
    isAuth: boolean;
    redirectPath: string;
    children: JSX.Element;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
    path,
    isAuth,
    redirectPath,
    children
})
:JSX.Element => {

    return (
        <Route
        path={ path }
        render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location }
            }}
          />
        )} />
    );
};

export default PrivateRoute;