/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import Transition from './Transition';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { showSuccessResetPasswordDialog } from '../../stores/actions/DialogControlActions';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';
import { Trans } from 'react-i18next';

interface MapDispatcherToProps {
  showSuccessResetPasswordDialog: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
    isSuccessResetPasswordVisible: boolean;
}

const mapDispatcherToProps = (dispatch: Dispatch): MapDispatcherToProps => ({
    showSuccessResetPasswordDialog: (isDialogVisible: boolean) => (
        dispatch(showSuccessResetPasswordDialog(isDialogVisible))
    )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
  isSuccessResetPasswordVisible: state.dialogControl.isSuccessResetPasswordVisible
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const SuccessResetPassword: React.FC<PropsFromRedux> = ({
    isSuccessResetPasswordVisible,
    showSuccessResetPasswordDialog
}): JSX.Element => {
      return (
          <Dialog
          open={ isSuccessResetPasswordVisible }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ () => showSuccessResetPasswordDialog(false) }
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
              <Trans i18nKey='successes.resetPasswordTitle' />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
                <Trans i18nKey='successes.resetPasswordText'/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => showSuccessResetPasswordDialog(false) } color='secondary'>
              <Trans i18nKey='action.ok' />
            </Button>
          </DialogActions>
        </Dialog>
      );
  };

export default connector(SuccessResetPassword);