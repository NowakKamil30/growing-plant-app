import React from 'react';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import { HomePage } from '../layouts/HomePage';
export const AppRouter = () => (
    <Router>
        <Route path='/' component={HomePage}/>
    </Router>
);