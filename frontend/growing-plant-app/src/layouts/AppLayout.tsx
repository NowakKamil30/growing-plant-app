// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import MainDrawer from '../components/Drawers/MainDrawer';
import { AppRouter } from '../router/AppRouter';
import Header from './Header';

export const AppLayout = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Header/>
        <MainDrawer/>
        <AppRouter/>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: 1,
    minHeight: '100vh'
  },
}),
);