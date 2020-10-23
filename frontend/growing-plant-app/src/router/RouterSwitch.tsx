import React from 'react';
import {
    Route,
    Switch
  } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
const RouterSwitch = () => (
    <Switch>
        <Route exact path='/'>
            <HomePage/>
        </Route>
    </Switch>
);

export default RouterSwitch;