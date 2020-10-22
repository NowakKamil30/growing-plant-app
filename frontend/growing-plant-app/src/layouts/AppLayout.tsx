import React from 'react';
import { AppRouter } from '../router/AppRouter';
import { Header } from './Header';


function AppLayout(): JSX.Element {
  return (
    <div>
        <Header/>
        <AppRouter/>
    </div>
  );
}

export default AppLayout;