/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Transition from './Transition';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { showAddDeviceDialog } from '../../stores/actions/DialogControlActions';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';

interface MapDispatcherToProps {
    showAddDeviceDialog: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
    isAddDeviceDialogVisible: boolean;
}

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps => ({
    showAddDeviceDialog: (isDialogVisible: boolean) => (
        dispatch(showAddDeviceDialog(isDialogVisible))
    )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    isAddDeviceDialogVisible: state.dialogControl.isAddDeviceDialogVisible
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const AddDeviceDialog: React.FC<PropsFromRedux> = ({
    isAddDeviceDialogVisible,
    showAddDeviceDialog
}): JSX.Element => {

      return (
          <Dialog
          open={ isAddDeviceDialogVisible }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ () => showAddDeviceDialog(false) }
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
            <Button onClick={ () => showAddDeviceDialog(false) } color='primary'>
              Disagree
            </Button>
            <Button onClick={ () => showAddDeviceDialog(false) } color='primary'>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      );
  };

export default connector(AddDeviceDialog);