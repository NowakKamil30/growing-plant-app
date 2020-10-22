// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { AppRouter } from '../router/AppRouter';
import { Header } from './Header';

export const AppLayout = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Header/>
        <AppRouter/>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    flex: 1,
    minHeight: '100vh'
  },
}),
);