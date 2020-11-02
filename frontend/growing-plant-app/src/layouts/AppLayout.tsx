// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import DialogManager from '../components/dialogs/DialogManager';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';

export const AppLayout = (): JSX.Element => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Header/>
          <Nav/>
          <Main/>
          <Footer/>
          <DialogManager/>
      </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    flex: 1,
    minHeight: '100vh'
  },
}),
);