/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import DialogManager from '../components/dialogs/DialogManager';
import { checkAuthLocalStorage } from '../stores/actions/AuthActions';
import { AuthTypes } from '../stores/types/AuthTypes';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Nav from './Nav';

interface MapDispatcherToProps {
  checkAuthLocalStorage: () => AuthTypes;
}

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps => ({
  checkAuthLocalStorage: () => (
      dispatch(checkAuthLocalStorage())
  )
});

const connector = connect(null, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const AppLayout: React.FC<PropsFromRedux> = ({
  checkAuthLocalStorage
}): JSX.Element => {
  useEffect(() => { checkAuthLocalStorage(); });
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

export default connector(AppLayout);