/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    Redirect,
    Route,
    Switch
  } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Role } from '../enums/Role';
import About from '../pages/About';
import AdminPanel from '../pages/AdminPanel';
import ChangePassword from '../pages/ChangePassword';
import Error404 from '../pages/Error404';
import { HomePage } from '../pages/HomePage';
import MyAccount from '../pages/MyAccount';
import MyDevice from '../pages/MyDevice';
import VerificationAccount from '../pages/VerificationAccount';
import { checkAuthLocalStorage } from '../stores/actions/AuthActions';
import { ReduceTypes } from '../stores/reducers';
import { AuthTypes } from '../stores/types/AuthTypes';
import ContactRouter from './ContactRouter';
import PrivateRoute from './PrivateRoute';
import ShopRouter from './ShopRouter';

interface MapStateToProps {
    role: Role;
}

interface MapDispatcherToProps {
    checkAuthLocalStorage: () => AuthTypes;
}
  

const MapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    role: state.auth.role
});

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps => ({
    checkAuthLocalStorage: () => (
        dispatch(checkAuthLocalStorage())
    )
  });


const connector = connect(MapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const RouterSwitch: React.FC<PropsFromRedux> = ({
    role,
    checkAuthLocalStorage
}) => { 
    useEffect(() => {
        checkAuthLocalStorage()})
return (
    <Switch>
        <Route exact path='/'>
            <HomePage/>
        </Route>
        <PrivateRoute
        path='/my-account'
        isAuth={ !!role ? localStorage.getItem('role') === Role.ADMIN || localStorage.getItem('role') === Role.USER : role === Role.ADMIN || role === Role.USER }
        redirectPath='/not-found' 
        >
            <MyAccount/>
        </PrivateRoute>
        <PrivateRoute
        path='/my-device/:id'
        isAuth={ !!role ? localStorage.getItem('role') === Role.ADMIN || localStorage.getItem('role') === Role.USER : role === Role.ADMIN || role === Role.USER }
        redirectPath='/not-found'
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
        redirectPath='/not-found'
        >
            <AdminPanel/>
        </PrivateRoute>
        <PrivateRoute
        path='/verification-account'
        isAuth={ !!role ? localStorage.getItem('role') !== Role.ADMIN || localStorage.getItem('role') !== Role.USER : role !== Role.ADMIN && role !== Role.USER }
        redirectPath='/not-found'
        >
        <VerificationAccount/>
        </PrivateRoute>
        <PrivateRoute
        path='/change-password'
        isAuth={ !!role ? localStorage.getItem('role') !== Role.ADMIN || localStorage.getItem('role') !== Role.USER : role !== Role.ADMIN && role !== Role.USER }
        redirectPath='/not-found'
        >
        <ChangePassword/>
        </PrivateRoute>
        <Route path='/not-found'>
            <Error404/>
        </Route>
        <Route path='*'>
        <Redirect to={{
                    pathname: '/not-found'
                }} />
        </Route>
    </Switch>
)};

export default connector(RouterSwitch);