import React from 'react';
import {
    Route,
    Switch
  } from 'react-router-dom';
import About from '../pages/About';
import AdminPanel from '../pages/AdminPanel';
import Error404 from '../pages/Error404';
import { HomePage } from '../pages/HomePage';
import MyAccount from '../pages/MyAccount';
import MyDevice from '../pages/MyDevice';
import ContactRouter from './ContactRouter';
import PrivateRoute from './PrivateRoute';
import ShopRouter from './ShopRouter';
const RouterSwitch = () => (
    <Switch>
        <Route exact path='/'>
            <HomePage/>
        </Route>
        <PrivateRoute
        path='/my-account'
        isAuth={ false }
        redirectPath='/'
        >
            <MyAccount/>
        </PrivateRoute>
        <PrivateRoute
        path='/my-device/:id'
        isAuth={ false }
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
        isAuth={ false }
        redirectPath='/'
        >
            <AdminPanel/>
        </PrivateRoute>
        <Route path='*'>
            <Error404/>
        </Route>
    </Switch>
);

export default RouterSwitch;