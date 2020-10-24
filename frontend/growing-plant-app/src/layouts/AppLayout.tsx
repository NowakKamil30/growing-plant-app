// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import RouterSwitch from '../router/RouterSwitch';
import Header from './Header';
import Nav from './Nav';

export const AppLayout = (): JSX.Element => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Header/>
          <Nav/>
          <RouterSwitch/>
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