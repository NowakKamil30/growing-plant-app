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
import ShopRouter from './ShopRouter';
const RouterSwitch = () => (
    <Switch>
        <Route exact path='/'>
            <HomePage/>
        </Route>
        <Route path='/my-account'>
            <MyAccount/>
        </Route>
        <Route path='/my-device/:id'>
            <MyDevice/>
        </Route>
        <Route path='/contact'>
            <ContactRouter/>
        </Route>
        <Route path='/shop'>
            <ShopRouter/>
        </Route>
        <Route path='/about'>
            <About/>
        </Route>
        <Route path='/admin-panel'>
            <AdminPanel/>
        </Route>
        <Route path='*'>
            <Error404/>
        </Route>
    </Switch>
);

export default RouterSwitch;