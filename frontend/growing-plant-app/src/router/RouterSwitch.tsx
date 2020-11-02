/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    Route,
    Switch
  } from 'react-router-dom';
import { Role } from '../enums/Role';
import About from '../pages/About';
import AdminPanel from '../pages/AdminPanel';
import Error404 from '../pages/Error404';
import { HomePage } from '../pages/HomePage';
import MyAccount from '../pages/MyAccount';
import MyDevice from '../pages/MyDevice';
import { ReduceTypes } from '../stores/reducers';
import ContactRouter from './ContactRouter';
import PrivateRoute from './PrivateRoute';
import ShopRouter from './ShopRouter';

interface MapStateToProps {
    role: Role;
}

const MapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    role: state.auth.role
});

const connector = connect(MapStateToProps, null);

type PropsFromRedux = ConnectedProps<typeof connector>;

const RouterSwitch: React.FC<PropsFromRedux> = ({
    role
}) => (
    <Switch>
        <Route exact path='/'>
            <HomePage/>
        </Route>
        <PrivateRoute
        path='/my-account'
        isAuth={ role === Role.ADMIN || role === Role.USER }
        redirectPath='/'
        >
            <MyAccount/>
        </PrivateRoute>
        <PrivateRoute
        path='/my-device/:id'
        isAuth={ role === Role.ADMIN || role === Role.USER }
        redirectPath='/'
        >
            <MyDevice/>
        </PrivateRoute>
        <Route path='/contact'>
            <ContactRouter/>
        </Route>
        <Route path='/shop'>
            <ShopRouter/>
        </Route>
        <Route path='/about'>
            <About/>
        </Route>
        <PrivateRoute
        path='/admin-panel'
        isAuth={ role === Role.ADMIN }
        redirectPath='/'
        >
            <AdminPanel/>
        </PrivateRoute>
        <Route path='*'>
            <Error404/>
        </Route>
    </Switch>
);

export default connector(RouterSwitch);