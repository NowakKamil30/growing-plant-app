import React from 'react';
import {
    BrowserRouter as Router,
  } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
const AppRouter = () => (
    <Router>
        <AppLayout/>
    </Router>
);

export default AppRouter;