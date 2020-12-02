/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Button,
    createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import Transition from './Transition';
import { ReduceTypes } from '../../stores/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { showRegisterDialog, showSuccessRegisterDialog } from '../../stores/actions/DialogControlActions';
import { DialogControlTypes } from '../../stores/types/DialogControlTypes';
import { Trans } from 'react-i18next';
import { useFormik } from 'formik';
import { RegisterUser } from '../../interfaces/RegisterUser';
import * as Yup from 'yup';
import ApiHandlerButton from '../buttons/ApiHandlerButton';
import { register } from '../../stores/api/AuthOperations';
import { ThunkDispatch } from 'redux-thunk';
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import { AuthTypes } from '../../stores/types/AuthTypes';
import { registerMessage } from '../../stores/actions/AuthActions';
import Snackbar from '../snackbar/Snackbar';

interface MapDispatcherToProps {
    showRegisterDialog: (isVisible: boolean) => DialogControlTypes;
    register: (
      registerUser: RegisterUser,
      successAction?: () => void,
      errorAction?: () => void
      ) => void;
      changeRegisterMessage: (message: SnackbarInfo) => AuthTypes;
      showSuccessRegisterDialog: (isVisible: boolean) => DialogControlTypes;
}

interface  MapStateToProps {
    isShowRegisterDialog: boolean;
    isRegisterFetching: boolean;
    registerMessage: SnackbarInfo;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<{}, {}, any>): MapDispatcherToProps => ({
    showRegisterDialog: (isDialogVisible: boolean) => (
        dispatch(showRegisterDialog(isDialogVisible))
    ),
    register: async (
      registerUser: RegisterUser,
      successAction?: () => void,
      errorAction?: () => void
      ) => (
        await dispatch(register(
          registerUser,
          successAction,
          errorAction
        ))
      ),
      changeRegisterMessage: (error: SnackbarInfo) => (
        dispatch(registerMessage(error))
      ),
      showSuccessRegisterDialog: (isSuccessRegisterVisible: boolean) => (
        dispatch(showSuccessRegisterDialog(isSuccessRegisterVisible))
      )
});

const mapStateToProps = (state: ReduceTypes): MapStateToProps => ({
    isShowRegisterDialog: state.dialogControl.isRegisterDialogVisible,
    isRegisterFetching: state.auth.isRegisterFetching,
    registerMessage: state.auth.registerMessage
});

const connector = connect(mapStateToProps, mapDispatcherToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ResetPasswordDialog: React.FC<PropsFromRedux> = ({
    isShowRegisterDialog,
    isRegisterFetching,
    registerMessage,
    showRegisterDialog,
    changeRegisterMessage
}): JSX.Element => {
  const { form, input } = useStyles();
  const initialValues: { email: string }  = {
    email: ''
  };

  const {
    values,
    errors,
    isValid,
    touched,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik<{ email: string }>({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup
            .string()
            .strict(true)
            .required('forms.errors.isRequired')
            .min(5, 'forms.errors.wrongLenghtEmail')
            .max(50, 'forms.errors.wrongLenghtEmail')
            .email('forms.errors.notEmail')
            .trim('forms.errors.noStartOrEndWithSpace'),
    }),
    onSubmit: (values: { email: string }) => {
      console.log(values);

    }
  });

      return (
          <Dialog
          open={ true }
          TransitionComponent={ Transition }
          keepMounted
          onClose={ () => !isRegisterFetching ? showRegisterDialog(false) : null }
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          fullWidth={ true }
        >
          <DialogTitle id='alert-dialog-slide-title'>
            <Trans i18nKey='forms.resetPassword.title'/>
          </DialogTitle>
          <DialogContent>
            <form
            noValidate
            onSubmit={ handleSubmit }
            className={ form }
            >
            <TextField
            id='email'
            name='email'
            error={ !!errors.email }
            onChange={ handleChange }
            onBlur={ handleBlur }
            value={ values.email }
            label={ <Trans i18nKey='forms.register.email'/> }
            color='secondary'
            className={ input }
            helperText={ <Trans i18nKey={ errors.email }/> }
            />
            <DialogActions>
            <ApiHandlerButton
                type='submit'
                disabled = { !isValid || touched === {} || !dirty }
                color='secondary'
                i18nKey='action.send'
                isFetching={ isRegisterFetching }
            />
            <Button
            onClick={ () => showRegisterDialog(false) }
            color='secondary'
            disabled={ isRegisterFetching }>
              <Trans i18nKey='action.cancel'/>
            </Button>
          </DialogActions>
            </form>
          </DialogContent>
          <Snackbar
          open={ registerMessage.isShow }
          autoHideDuration={ 9000 }
          onClose={ () => changeRegisterMessage({ ...registerMessage, isShow: false }) }
          severity={ registerMessage.severity }
          i18nKeyTitle={ registerMessage.i18nKeyTitle }
        />
        </Dialog>
      );
  };

  const useStyles = makeStyles((theme: Theme) =>(
    createStyles({
      input: {
        height: 70
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
      }
    })
  ));

export default connector(ResetPasswordDialog);