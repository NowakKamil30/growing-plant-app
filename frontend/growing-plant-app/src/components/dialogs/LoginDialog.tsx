/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { ReduceTypes } from '../../stores/reducers';
import Transition from './Transition';
import { showLoginDialog } from '../../stores/actions/DialogControlActions';

interface MapDispatcherToProps {
  showLoginDialog: (isVisible: boolean) => void;
}

interface  MapStateToProps {
  isShowLoginDialog: boolean;
}

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps => ({
    showLoginDialog: (isDialogVisible: boolean) => (
      dispatch(showLoginDialog(isDialogVisible))
    )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
  isShowLoginDialog: state.dialogControl.isLoginDialogVisible
});


const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginDialog: React.FC<PropsFromRedux> = ({
  isShowLoginDialog,
  showLoginDialog
}): JSX.Element => {

    return (
        <Dialog
        open={isShowLoginDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => showLoginDialog(false)}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>{'Use Google\'s location service?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => showLoginDialog(false)} color='primary'>
            Disagree
          </Button>
          <Button onClick={() => showLoginDialog(false)} color='primary'>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
};


export default connector(LoginDialog);