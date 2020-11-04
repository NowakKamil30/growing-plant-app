/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import Transition from './Transition';
import { ReduceTypes } from '../../stores/reducers';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { showAddDeviceDialog } from '../../stores/actions/DialogControlActions';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';
import { Trans } from 'react-i18next';
import { DeviceCode } from '../../interfaces/DeviceCode';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
      const initialValues: DeviceCode = {
        code: '',
      };

      const {
        values,
        errors,
        isValid,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
        setValues,
      } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
          code: Yup
                .string()
                .strict(true)
                .min(12)
                .max(12)
                .trim()

        }),
        onSubmit: (values: DeviceCode) => {
          console.log(values);
          resetForm();
         }
      });

      const closeDialog = (): void => {
        showAddDeviceDialog(false);
        resetForm();
      };

      return (
          <Dialog
          open={ isAddDeviceDialogVisible }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ () => showAddDeviceDialog(false) }
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
              <Trans i18nKey='forms.addDevice.title' />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
                <Trans i18nKey='forms.addDevice.text'/>
            </DialogContentText>
            <form
            noValidate
            onSubmit={ handleSubmit }
            >
           <TextField
            // tslint:disable-next-line: no-unsafe-any
            id='code'
            name='code'
            error={ !!errors.code }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.code }
            label={ <Trans i18nKey='forms.addDevice.title'/> }
            color='secondary'
            helperText={ <Trans i18nKey={ errors.code }/> }
            />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => showAddDeviceDialog(false) } color='secondary'>
              <Trans i18nKey='action.add' />
            </Button>
            <Button onClick={ () => closeDialog() } color='secondary'>
              <Trans i18nKey='action.cancel' />
            </Button>
          </DialogActions>
        </Dialog>
      );
  };

export default connector(AddDeviceDialog);