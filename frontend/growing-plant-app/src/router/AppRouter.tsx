import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
export const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path='/'>
                <HomePage/>
            </Route>
        </Switch>
    </Router>
);