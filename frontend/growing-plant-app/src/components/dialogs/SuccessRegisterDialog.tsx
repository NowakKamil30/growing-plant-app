/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import Transition from './Transition';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { showSuccessRegisterDialog } from '../../stores/actions/DialogControlActions';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';
import { Trans } from 'react-i18next';

interface MapDispatcherToProps {
  showSuccessRegisterDialog: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
  isSuccessRegisterDialogVisible: boolean;
}

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps => ({
  showSuccessRegisterDialog: (isDialogVisible: boolean) => (
        dispatch(showSuccessRegisterDialog(isDialogVisible))
    )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
  isSuccessRegisterDialogVisible: state.dialogControl.isSuccessRegisterDialogVisible
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const SuccessRegisterDialog: React.FC<PropsFromRedux> = ({
    isSuccessRegisterDialogVisible,
    showSuccessRegisterDialog
}): JSX.Element => {
      return (
          <Dialog
          open={ isSuccessRegisterDialogVisible }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ () => showSuccessRegisterDialog(false) }
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
              <Trans i18nKey='successes.registerTitle' />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
                <Trans i18nKey='successes.registerText'/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => showSuccessRegisterDialog(false) } color='secondary'>
              <Trans i18nKey='action.ok' />
            </Button>
          </DialogActions>
        </Dialog>
      );
  };

export default connector(SuccessRegisterDialog);