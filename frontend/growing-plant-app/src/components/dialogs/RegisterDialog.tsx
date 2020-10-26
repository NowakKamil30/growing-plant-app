/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Transition from './Transition';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { showRegisterDialog } from '../../stores/actions/DialogControlActions';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';

interface MapDispatcherToProps {
    showRegisterDialog: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
    isShowRegisterDialog: boolean;
}

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps => ({
    showRegisterDialog: (isDialogVisible: boolean) => (
        dispatch(showRegisterDialog(isDialogVisible))
    )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    isShowRegisterDialog: state.dialogControl.isRegisterDialogVisible
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const RegisterDialog: React.FC<PropsFromRedux> = ({
    isShowRegisterDialog,
    showRegisterDialog
}): JSX.Element => {

      return (
          <Dialog
          open={ isShowRegisterDialog }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ () => showRegisterDialog(false) }
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
            <Button onClick={ () => showRegisterDialog(false) } color='primary'>
              Disagree
            </Button>
            <Button onClick={ () => showRegisterDialog(false) } color='primary'>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      );
  };

export default connector(RegisterDialog);